import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule',
  }, 
  {
    path: '',
    loadChildren: './home/home.module#HomeModule',
  },
  {
    path: 'battles',
    loadChildren: './battles/battles.module#BattlesModule',
  }
];
