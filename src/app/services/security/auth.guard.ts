import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import {AppSecurityService} from './app-security.service';

export const authGuard: CanActivateFn = () => {

  const security = inject(AppSecurityService);
  const router = inject(Router);

  if (security.isAuthenticated()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
