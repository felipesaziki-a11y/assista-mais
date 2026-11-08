import { Injectable, inject } from '@angular/core';
import { Filme } from '../models/filme.model';
import { Auth } from './auth';
import { Catalogo } from './catalogo';

export interface Fileira {
  titulo: string;
  motivo: string;
  filmes: Filme[];
}

export interface Motivo {
  aspecto: 'diretor' | 'genero' | 'elenco' | 'ano' | 'pais';
  rotulo: string;
  detalhe: string;
  peso: number; // 0 a 100
}

const decada = (f: Filme) => Math.floor(Number(f.dataLancamento.slice(0, 4)) / 10) * 10;
const nota = (f: Filme) => f.avaliacoes.find((a) => a.fonte === 'IMDb')?.nota ?? 0;

// devolve [valor, quantidade] ordenado do mais frequente para o menos
function contar(valores: string[]): [string, number][] {
  const mapa = new Map<string, number>();
  for (const v of valores) mapa.set(v, (mapa.get(v) ?? 0) + 1);
  return [...mapa.entries()].sort((a, b) => b[1] - a[1]);
}

// ['A', 'B', 'C'] -> "A, B e C"
const lista = (itens: string[]) =>
  itens.length > 1 ? `${itens.slice(0, -1).join(', ')} e ${itens.at(-1)}` : (itens[0] ?? '');

@Injectable({ providedIn: 'root' })
export class Recomendador {
  private auth = inject(Auth);
  private catalogo = inject(Catalogo);

  private escolhidos(): Filme[] {
    const ids = this.auth.usuario()?.filmesEscolhidos ?? [];
    return ids.map((id) => this.catalogo.porId(id)).filter((f): f is Filme => !!f);
  }

  fileiras(): Fileira[] {
    const base = this.escolhidos();
    const ids = new Set(base.map((f) => f.id));
    const candidatos = this.catalogo
      .listar()
      .filter((f) => !ids.has(f.id))
      .sort((a, b) => nota(b) - nota(a));

    const fileiras: Fileira[] = [];

    const adicionar = (
      titulo: string,
      origem: (f: Filme) => boolean, // quais filmes ESCOLHIDOS geraram a fileira
      destino: (f: Filme) => boolean // quais filmes do catálogo entram nela
    ) => {
      const filmes = candidatos.filter(destino);
      if (!filmes.length) return;
      const motivo = `Porque você escolheu ${lista(base.filter(origem).map((f) => f.titulo))}`;
      fileiras.push({ titulo, motivo, filmes });
    };

    for (const [d] of contar(base.map((f) => f.diretor)).slice(0, 2)) {
      adicionar(`Mais de ${d}`, (f) => f.diretor === d, (f) => f.diretor === d);
    }

    for (const [ator] of contar(base.flatMap((f) => f.elenco)).filter(([, q]) => q >= 2).slice(0, 1)) {
      adicionar(`Com ${ator}`, (f) => f.elenco.includes(ator), (f) => f.elenco.includes(ator));
    }

    for (const [g] of contar(base.flatMap((f) => f.generos)).slice(0, 2)) {
      adicionar(g, (f) => f.generos.includes(g), (f) => f.generos.includes(g));
    }

    const topDecada = contar(base.map((f) => String(decada(f))))[0];
    if (topDecada) {
      const d = Number(topDecada[0]);
      adicionar(`Lançados nos anos ${d}`, (f) => decada(f) === d, (f) => decada(f) === d);
    }

    const topPais = contar(base.map((f) => f.pais))[0];
    if (topPais) {
      const pais = topPais[0];
      // só mostra se o país for "distintivo" (senão a fileira seria quase o catálogo inteiro)
      if (candidatos.filter((f) => f.pais === pais).length <= candidatos.length / 2) {
        adicionar(`Cinema: ${pais}`, (f) => f.pais === pais, (f) => f.pais === pais);
      }
    }

    return [
      ...fileiras.slice(0, 5),
      { titulo: 'Mais bem avaliados', motivo: 'Os favoritos do público no IMDb', filmes: candidatos.slice(0, 10) },
    ];
  }

  // por que ESTE filme combina com o gosto do usuário
  motivosPara(filme: Filme): Motivo[] {
    const escolhidos = this.escolhidos();
    if (escolhidos.some((f) => f.id === filme.id)) return [];
    const base = escolhidos;
    const motivos: Motivo[] = [];

    const mesmoDiretor = base.filter((f) => f.diretor === filme.diretor);
    if (mesmoDiretor.length) {
      motivos.push({
        aspecto: 'diretor',
        rotulo: 'Diretor',
        detalhe: `${filme.diretor}, o mesmo de ${lista(mesmoDiretor.map((f) => f.titulo))}`,
        peso: 90,
      });
    }

    const generos = filme.generos.filter((g) => base.some((f) => f.generos.includes(g)));
    if (generos.length) {
      motivos.push({
        aspecto: 'genero',
        rotulo: 'Gênero',
        detalhe: `${lista(generos)}, que aparecem nos seus favoritos`,
        peso: Math.round((generos.length / filme.generos.length) * 80),
      });
    }

    const atores = filme.elenco.filter((a) => base.some((f) => f.elenco.includes(a)));
    if (atores.length) {
      motivos.push({
        aspecto: 'elenco',
        rotulo: 'Elenco',
        detalhe: `${lista(atores)} também atua em filmes que você escolheu`,
        peso: Math.min(100, 50 + atores.length * 15),
      });
    }

    if (base.some((f) => decada(f) === decada(filme))) {
      motivos.push({
        aspecto: 'ano',
        rotulo: 'Época',
        detalhe: `Lançado nos anos ${decada(filme)}, como outros filmes que você escolheu`,
        peso: 40,
      });
    }

    if (base.some((f) => f.pais === filme.pais)) {
      motivos.push({
        aspecto: 'pais',
        rotulo: 'País',
        detalhe: `Produção de ${filme.pais}`,
        peso: 30,
      });
    }

    return motivos.sort((a, b) => b.peso - a.peso);
  }
}