import { Injectable, computed, signal } from '@angular/core';

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  filmesEscolhidos: number[]; // ids dos filmes da escolha inicial
}

@Injectable({ providedIn: 'root' })
export class Auth {
  private readonly CHAVE = 'usuario';

  private readonly SESSAO = 'sessao';

  private readonly _usuario = signal<Usuario | null>(this.carregarSessao());

  readonly usuario = this._usuario.asReadonly();
  readonly logado = computed(() => this._usuario() !== null);
  readonly escolhaInicialConcluida = computed(
    () => (this._usuario()?.filmesEscolhidos.length ?? 0) >= 3
  );

  estaLogado(): boolean {
    return this._usuario() !== null;
  }

  entrar(email: string, senha: string): boolean {
    // MOCK: aceita qualquer login. Depois vira uma chamada HTTP.
    const existente = this.carregar();
    const usuario: Usuario =
      existente?.email === email
        ? existente
        : { id: 1, nome: email.split('@')[0], email, filmesEscolhidos: [] };
    this.salvar(usuario);
    return true;
  }

  cadastrar(nome: string, email: string, senha: string): void {
    this.salvar({ id: Date.now(), nome, email, filmesEscolhidos: [] });
  }

  salvarEscolhaInicial(idsFilmes: number[]): void {
    const atual = this._usuario();
    if (atual) this.salvar({ ...atual, filmesEscolhidos: idsFilmes });
  }

  sair(): void {
    localStorage.removeItem(this.SESSAO);
    this._usuario.set(null);
  }

  private salvar(usuario: Usuario): void {
    localStorage.setItem(this.CHAVE, JSON.stringify(usuario));
    localStorage.setItem(this.SESSAO, '1');
    this._usuario.set(usuario);
  }

  private carregar(): Usuario | null {
    const bruto = localStorage.getItem(this.CHAVE);
    return bruto ? JSON.parse(bruto) : null;
  }
  private carregarSessao(): Usuario | null {                           // novo método
  return localStorage.getItem(this.SESSAO) ? this.carregar() : null;
  }
}