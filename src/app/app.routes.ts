import { Routes } from '@angular/router';
import { Main } from './pages/main/main';

export const routes: Routes = [
  {
    path: '',
    component: Main,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
