import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../../shared/components/navbar/navbar';

@Component({
  selector: 'app-layout-principal',
  imports: [RouterOutlet, Navbar],
  templateUrl: './layout-principal.html',
  styleUrl: './layout-principal.scss',
})
export class LayoutPrincipal {}