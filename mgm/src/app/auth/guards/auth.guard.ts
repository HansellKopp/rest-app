import { inject } from "@angular/core";
import { CanActivateFn, CanMatchFn, Router } from "@angular/router";
import { AuthService } from "../services/auth-service";
import { Observable, map, of, tap } from "rxjs";

const checkAuthStatus = (): boolean => {
  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);
  const isLogged = authService.isLogged()
  if(!isLogged)
  {
    router.navigate(['/login']);
  }
  return isLogged;
};

export function canActivateGuard(): boolean  {
  return checkAuthStatus()
}

export function canMatchGuard(): CanMatchFn {
  return () => {
    return checkAuthStatus();
  }
}

export function publicGuard(): boolean {
  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);
  const isLogged = authService.isLogged()
  return !isLogged
}

