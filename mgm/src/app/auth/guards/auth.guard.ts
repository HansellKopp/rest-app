import { inject } from "@angular/core";
import { CanActivateFn, CanMatchFn, Router } from "@angular/router";
import { AuthService } from "../services/auth-service";
import { Observable, of, tap } from "rxjs";

const checkAuthStatus = (): boolean | Observable<boolean> => {
  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);
 
  return authService.checkAuthentication().pipe(
    tap((isAuthenticated) => {
      if (!isAuthenticated) {
        router.navigate(['/login']);
      }
    })
  );
};

export function canActivateGuard(): boolean | Observable<boolean> {
  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);
 
  return checkAuthStatus();
}

export function canMatchGuard(): CanMatchFn {
  return () => {
    const oauthService: AuthService = inject(AuthService);    
    return checkAuthStatus();
  }
}
