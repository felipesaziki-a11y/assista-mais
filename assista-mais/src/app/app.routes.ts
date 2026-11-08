import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { escolhaInicialGuard } from './core/guards/escolha-inicial-guard';

export const routes: Routes = [
  // ---------- públicas (sem navbar) ----------
  {
    path: 'login',
    title: 'Entrar | Assista+',
    loadComponent: () =>
      import('./features/auth/login/login').then((m) => m.Login),
  },
  {
    path: 'cadastro',
    title: 'Criar conta | Assista+',
    loadComponent: () =>
      import('./features/auth/cadastro/cadastro').then((m) => m.Cadastro),
  },

  // ---------- logado, mas sem navbar ----------
  {
    path: 'escolha-inicial',
    title: 'Escolha seus filmes | Assista+',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/escolha-inicial/escolha-inicial').then(
        (m) => m.EscolhaInicial
      ),
  },

  // ---------- logado, com navbar ----------
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./layouts/layout-principal/layout-principal').then(
        (m) => m.LayoutPrincipal
      ),
    children: [
      {
        path: '',
        pathMatch: 'full',
        title: 'Assista+',
        canActivate: [escolhaInicialGuard],
        loadComponent: () =>
          import('./features/inicio/inicio').then((m) => m.Inicio),
      },
      {
        path: 'busca',
        title: 'Busca | Assista+',
        loadComponent: () =>
          import('./features/busca/busca').then((m) => m.Busca),
      },
      {
        path: 'filme/:id',
        title: 'Filme | Assista+',
        loadComponent: () =>
          import('./features/detalhe-filme/detalhe-filme').then(
            (m) => m.DetalheFilme
          ),
      },
      {
        path: 'filme/:id/avaliar',
        title: 'Avaliar filme | Assista+',
        loadComponent: () =>
          import('./features/avaliar-filme/avaliar-filme').then(
            (m) => m.AvaliarFilme
          ),
      },
    ],
  },

  // ---------- qualquer rota desconhecida ----------
  { path: '**', redirectTo: '' },
];