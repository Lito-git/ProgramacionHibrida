import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'configuracion',
    loadComponent: () => import('./paginas/configuracion/configuracion.page').then( m => m.ConfiguracionPage)
  },
  {
    path: 'gestion-de-citas',
    loadComponent: () => import('./paginas/gestion-de-citas/gestion-de-citas.page').then( m => m.GestionDeCitasPage)
  },
];
