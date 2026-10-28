import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const soloPublicGuard: CanActivateFn = (route, state) => {
  // Deja pasar solo si NO hay token (usuario sin loguear); si ya está logueado, lo manda a sus contactos
  const authService = inject(Auth);
  const router = inject(Router);
  if (!authService.token) return true;

  const contactsPath = router.parseUrl("/contacts");
  return new RedirectCommand(contactsPath, {
    skipLocationChange: false,
  });
};
