import { Injectable, inject } from '@angular/core';
import { 
  HttpEvent, HttpRequest, HttpHandler, 
  HttpInterceptor, HttpErrorResponse 
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth-service';

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {
  counter = 0
  private router: Router = inject(Router);
  private authService: AuthService = inject(AuthService);
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      // retry(1),
      catchError((error: HttpErrorResponse,src) => {
        if (error.status === 401) {
          if(this.counter == 0) {
            this.counter++;
            console.log("refresh" )
            return next.handle(request)
          }
          if(this.counter == 1) {
            this.authService.clearUser()
            this.router.navigateByUrl("/login")
            return throwError(()=> error.statusText);
          }
        }
        return throwError(()=> error.statusText);
      })
    );    
  }
}