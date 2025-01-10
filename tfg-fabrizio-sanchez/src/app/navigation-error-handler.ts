import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const handleNavigationError = (error: any) => {
  console.error('Navigation error:', error);

  const router = inject(Router);

  // Ejemplo: Redirige a una página de error personalizada si ocurre un fallo al cargar módulos
  if (error.message.includes('Failed to load module')) {
    return router.parseUrl('/error-loading');
  }

  // Permite que Angular maneje el error normalmente
  return null;
};
