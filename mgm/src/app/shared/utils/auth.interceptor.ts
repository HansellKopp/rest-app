import { Injectable } from '@angular/core';
import { 
  HttpEvent, HttpRequest, HttpHandler, 
  HttpInterceptor, 
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = localStorage.getItem("token");
    if(authToken) {
      const clonedRequest = request.clone({
        headers: request.headers.set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer '+authToken)
      });
      return next.handle(clonedRequest);    
    }
    return next.handle(request);
  }
}

export const authInterceptorProviders = [
{
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
}];