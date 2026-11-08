import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Recomendador } from '../../core/services/recomendador';

@Component({
  selector: 'app-inicio',
  imports: [RouterLink],
  templateUrl: './inicio.html',
  styleUrl: './inicio.scss',
})
export class Inicio {
  private recomendador = inject(Recomendador);
  fileiras = computed(() => this.recomendador.fileiras());
}