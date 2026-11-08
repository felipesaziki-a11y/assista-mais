import { Injectable } from '@angular/core';
import { FILMES } from '../mocks/filmes.mock';
import { Filme } from '../models/filme.model';

const normalizar = (texto: string) =>
  texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

@Injectable({ providedIn: 'root' })
export class Catalogo {
  listar(): Filme[] {
    return FILMES;
  }

  porId(id: number): Filme | undefined {
    return FILMES.find((f) => f.id === id);
  }

  buscar(termo: string): Filme[] {
    const t = normalizar(termo.trim());
    if (!t) return [];
    return FILMES.filter(
      (f) =>
        normalizar(f.titulo).includes(t) ||
        normalizar(f.diretor).includes(t) ||
        f.elenco.some((a) => normalizar(a).includes(t)) ||
        f.generos.some((g) => normalizar(g).includes(t))
    );
  }
}