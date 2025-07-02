import { Routes } from '@angular/router';
import {authGuard} from './services/security/auth.guard';

export const routes: Routes = [
    {
      path: 'login',
      loadComponent: () => import('./portals/pub/login-page/login-page').then((m) => m.LoginPage)
    },
    {
      path: 'home',
      loadComponent: () => import('../app/portals/main/home-portal/home-portal').then((m) => m.HomePortal),
     canActivate: [authGuard],
      children: [
        {
          path: '',
          loadComponent: () => import('../app/mods/home/home-page/home-page').then((m) => m.HomePage)
        },
        {
          path: 'clientes',
          loadComponent: () => import('../app/mods/customer/pages/customer-page/customer-page').then((m) => m.CustomerPage)
        },
        {
          path: 'cuentas',
          loadComponent: () => import('../app/mods/account/pages/account-page/account-page').then((m) => m.AccountPage)
        },
        {
          path: 'bancos',
          loadComponent: () => import('../app/mods/banks/pages/bank-page/bank-page').then((m) => m.BankPage)
        },
      ]
    },
  
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full'
    },
    {
      path: '**',
      redirectTo:
        'login'
    }
];
