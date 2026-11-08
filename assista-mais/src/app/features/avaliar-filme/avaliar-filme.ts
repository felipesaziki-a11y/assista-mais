import { Component, computed, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Aspecto, Geral, Relevancia } from '../../core/models/avaliacao-usuario.model';
import { Avaliacoes } from '../../core/services/avaliacoes';
import { Catalogo } from '../../core/services/catalogo';
import { Recomendador } from '../../core/services/recomendador';

const ASPECTOS = [
  { chave: 'diretor', rotulo: 'Diretor' },
  { chave: 'elenco', rotulo: 'Elenco' },
  { chave: 'genero', rotulo: 'Gênero' },
  { chave: 'ano', rotulo: 'Época de lançamento' },
  { chave: 'pais', rotulo: 'País de origem' },
] as const;

const NIVEIS = [
  { valor: 'alta', rotulo: 'Muito relevante' },
  { valor: 'media', rotulo: 'Relevante' },
  { valor: 'baixa', rotulo: 'Pouco relevante' },
] as const;

const GERAIS = [
  { valor: 'gostei', rotulo: '👍 Gostei', tipo: 'gostei' },
  { valor: 'neutro', rotulo: '😐 Neutro', tipo: 'neutro' },
  { valor: 'nao-gostei', rotulo: '👎 Não gostei', tipo: 'nao' },
] as const;

@Component({
  selector: 'app-avaliar-filme',
  imports: [],
  templateUrl: './avaliar-filme.html',
  styleUrl: './avaliar-filme.scss',
})
export class AvaliarFilme {
  private catalogo = inject(Catalogo);
  private recomendador = inject(Recomendador);
  private avaliacoes = inject(Avaliacoes);
  private router = inject(Router);

  id = input.required<string>();
  filme = computed(() => this.catalogo.porId(Number(this.id())));
  motivos = computed(() => {
    const f = this.filme();
    return f ? this.recomendador.motivosPara(f) : [];
  });

  readonly aspectos = ASPECTOS;
  readonly niveis = NIVEIS;
  readonly gerais = GERAIS;

  escolhas = signal<Partial<Record<Aspecto, Relevancia>>>({});
  geral = signal<Geral | null>(null);
  podeSalvar = computed(() => this.geral() !== null);

  nivelDe(aspecto: Aspecto) {
    return this.escolhas()[aspecto];
  }

  escolherNivel(aspecto: Aspecto, nivel: Relevancia) {
    this.escolhas.update((e) => ({ ...e, [aspecto]: nivel }));
  }

  salvar() {
    const f = this.filme();
    const geral = this.geral();
    if (!f || !geral) return;

    const e = this.escolhas();
    this.avaliacoes.salvar({
      filmeId: f.id,
      aspectos: {
        diretor: e.diretor ?? 'media',
        elenco: e.elenco ?? 'media',
        genero: e.genero ?? 'media',
        ano: e.ano ?? 'media',
        pais: e.pais ?? 'media',
      },
      geral,
    });
    this.router.navigate(['/']);
  }
}