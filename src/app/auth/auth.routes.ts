import { inject } from '@angular/core';
import { Routes } from '@angular/router';

import { AuthService } from './auth.service';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then((c) => c.LoginComponent)
  },
  {
    path: 'logout',
    loadComponent: () => import('./logout/logout.component').then((c) => c.LogoutComponent),
    resolve: {
      performLogout: () => inject(AuthService).logout()
    }
  },
  {
    path: 'signup',
    loadComponent: () => import('./signup/signup.component').then((c) => c.SignupComponent)
  }
];
