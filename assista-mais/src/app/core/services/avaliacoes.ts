import { Injectable, signal } from '@angular/core';
import { AvaliacaoUsuario } from '../models/avaliacao-usuario.model';

@Injectable({ providedIn: 'root' })
export class Avaliacoes {
  private readonly CHAVE = 'avaliacoes';
  private readonly _lista = signal<AvaliacaoUsuario[]>(this.carregar());

  readonly lista = this._lista.asReadonly();

  obter(filmeId: number): AvaliacaoUsuario | undefined {
    return this._lista().find((a) => a.filmeId === filmeId);
  }

  salvar(avaliacao: AvaliacaoUsuario): void {
    this._lista.update((l) => [...l.filter((a) => a.filmeId !== avaliacao.filmeId), avaliacao]);
    localStorage.setItem(this.CHAVE, JSON.stringify(this._lista()));
  }

  private carregar(): AvaliacaoUsuario[] {
    try {
      return JSON.parse(localStorage.getItem(this.CHAVE) ?? '[]');
    } catch {
      return [];
    }
  }
}