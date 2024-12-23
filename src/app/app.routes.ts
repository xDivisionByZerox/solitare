import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'play',
    pathMatch: 'full',
  },
  {
    path: 'play',
    loadComponent: () => import('./pages/game/game.component').then((m) => m.GameComponent),
  }
];
