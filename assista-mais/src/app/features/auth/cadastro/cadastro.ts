import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../../core/services/auth';

@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-cadastro',
  styleUrl: './cadastro.scss',
  templateUrl: './cadastro.html',
})
export class Cadastro {
  private auth = inject(Auth);
  private router = inject(Router);

  nome = '';
  email = '';
  senha = '';
  confirmar = '';
  erro = signal('');

  cadastrar() {
  console.log('1. entrar() chamado', this.email, this.senha);

  if (!this.email || !this.senha) {
    this.erro.set('Preencha e-mail e senha.');
    return;
  }

  this.auth.entrar(this.email, this.senha);
  console.log('2. logado?', this.auth.estaLogado());

  this.router.navigate(['/']).then(
    (ok) => console.log('3. navegou?', ok, 'URL:', this.router.url),
    (erro) => console.error('3. erro na navegação', erro)
  );
}
}