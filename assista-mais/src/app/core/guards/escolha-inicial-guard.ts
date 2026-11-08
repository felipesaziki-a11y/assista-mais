import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const escolhaInicialGuard: CanActivateFn = () => {
  const autenticacao = inject(Auth);
  const router = inject(Router);

  return autenticacao.escolhaInicialConcluida()
    ? true
    : router.createUrlTree(['/escolha-inicial']);
};