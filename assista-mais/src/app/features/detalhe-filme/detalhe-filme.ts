import { DatePipe } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Catalogo } from '../../core/services/catalogo';

@Component({
  selector: 'app-detalhe-filme',
  imports: [RouterLink, DatePipe],
  templateUrl: './detalhe-filme.html',
  styleUrl: './detalhe-filme.scss',
})
export class DetalheFilme {
  private catalogo = inject(Catalogo);

  id = input.required<string>(); // vem de /filme/:id
  filme = computed(() => this.catalogo.porId(Number(this.id())));
}