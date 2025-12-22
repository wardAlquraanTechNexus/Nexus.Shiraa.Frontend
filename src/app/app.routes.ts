import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout-component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout-component';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    loadChildren: () => import('./auth/auth-module').then(m => m.AuthModule)
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    loadChildren: () => import('./admin/admin-module').then(m => m.AdminModule)
  }
];
