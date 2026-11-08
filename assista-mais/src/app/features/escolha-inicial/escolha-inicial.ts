import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../core/services/auth';
import { FILMES } from '../../core/mocks/filmes.mock';

// ignora maiúsculas e acentos na busca
const normalizar = (texto: string) =>
  texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

@Component({
  selector: 'app-escolha-inicial',
  imports: [],
  templateUrl: './escolha-inicial.html',
  styleUrl: './escolha-inicial.scss',
})
export class EscolhaInicial {
  private auth = inject(Auth);
  private router = inject(Router);

  readonly minimo = 3;

  termo = signal('');
  selecionados = signal<number[]>([]);

  filmes = computed(() => {
    const t = normalizar(this.termo());
    return FILMES.filter(
      (f) => normalizar(f.titulo).includes(t) || normalizar(f.diretor).includes(t)
    );
  });

  total = computed(() => this.selecionados().length);
  podeContinuar = computed(() => this.total() >= this.minimo);

  estaSelecionado(id: number): boolean {
    return this.selecionados().includes(id);
  }

  alternar(id: number) {
    this.selecionados.update((lista) =>
      lista.includes(id) ? lista.filter((i) => i !== id) : [...lista, id]
    );
  }

  continuar() {
    if (!this.podeContinuar()) return;
    this.auth.salvarEscolhaInicial(this.selecionados());
    this.router.navigate(['/']);
  }
}