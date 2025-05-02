// auth.interceptor.ts
import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './auth-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  if (req.url.includes('/auth/login') || req.url.includes('/auth/register')) {
    return next(req); // no añadir token a login/register
  }

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(authReq);
};

