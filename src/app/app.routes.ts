import { Routes } from '@angular/router';
import {authGuard} from './services/security/auth.guard';

export const routes: Routes = [
    {
      path: 'login',
      loadComponent: () => import('../app/portals/pub/login-page/login-page.component').then((m) => m.LoginPageComponent)
    },
    {
      path: 'home',
      loadComponent: () => import('../app/portals/main/home-portal/home-portal').then((m) => m.HomePortal),
     // canActivate: [authGuard],
      children: [
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
        {
          path: 'trasferencias',
          loadComponent: () => import('../app/mods/transfer/page/transfer-page/transfer-page').then((m) => m.TransferPage)
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

/*
* Sacar del routing la llamada al servicio customerservice
* agregar al customer service provideIn: 'root'
* crear el modulo de account y agregar que le account va a tener un customer por debajo
* */
// forma comun pero no tan recomendabe porque tarda en cargar 

/*
export const routes: Routes = [
    {path: 'login', component: },
    {path: 'inicio', component: , canAcrivate: [authGuard]},
    {path: '', redirecTo: 'inicio', patMatch: 'full'},
    {path: '**',redirectTo: '/login'}
];
*/