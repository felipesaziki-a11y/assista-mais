import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../../core/services/auth';
import { Catalogo } from '../../../core/services/catalogo';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  protected auth = inject(Auth);
  private catalogo = inject(Catalogo);
  private router = inject(Router);

  termo = signal('');
  aberto = signal(false);

  sugestoes = computed(() =>
    this.termo().trim().length >= 2 ? this.catalogo.buscar(this.termo()).slice(0, 6) : []
  );

  digitar(valor: string) {
    this.termo.set(valor);
    this.aberto.set(true);
  }

  // Enter: vai para a página de resultados
  buscar(evento: Event) {
    evento.preventDefault();
    const q = this.termo().trim();
    if (!q) return;
    this.aberto.set(false);
    this.router.navigate(['/busca'], { queryParams: { q } });
  }

  // clicou em uma sugestão
  selecionar() {
    this.aberto.set(false);
    this.termo.set('');
  }

  sair() {
    this.auth.sair();
    this.router.navigate(['/login']);
  }
}