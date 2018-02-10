import { Routes } from '@angular/router';
// import { ContentComponent } from './content/content.component';

export const APP_ROUTES: Routes = [
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule',
  }, 
  {
    path: 'home',
    loadChildren: './home/home.module#HomeModule',
  },
  {
    path: '',
    loadChildren: './content/content.module#ContentModule',
  }
];
