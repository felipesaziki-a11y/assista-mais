import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Catalogo } from '../../core/services/catalogo';

@Component({
  selector: 'app-busca',
  imports: [RouterLink],
  templateUrl: './busca.html',
  styleUrl: './busca.scss',
})
export class Busca {
  private catalogo = inject(Catalogo);

  // vem de /busca?q=... (graças ao withComponentInputBinding)
  q = input<string | undefined>();

  resultados = computed(() => this.catalogo.buscar(this.q() ?? ''));
}