import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const soloUserGuard: CanActivateFn = (route, state) => {
  // Deja pasar solo si hay token (usuario logueado); si no, lo manda al login
  const authService = inject(Auth);
  const router = inject(Router);
  if (authService.token) return true;

  const loginPath = router.parseUrl("/login");
  return new RedirectCommand(loginPath, {
    skipLocationChange: false,
  });
};
