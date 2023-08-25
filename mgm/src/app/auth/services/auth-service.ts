import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { AuthRequest, AuthResponse } from '../interfaces/auth.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }
  private user: User | undefined;
  private http = inject(HttpClient);
  private messageService = inject(MessageService);

  showErrorMessage(summary: string, detail: string): void {
    this.messageService.add({ severity: "error", summary, detail, life: 3000 })
  }

  showSuccessMessage(summary: string, detail: string): void {
    this.messageService.add({ severity: "success", summary, detail, life: 3000 })
  }

  login(data: AuthRequest): Observable<AuthResponse| undefined> {
    return this.http.post<AuthResponse>(`${environment.baseUrl}/auth`, data)
    .pipe(
      tap(response=> {
        if(response.token) {
          localStorage.setItem("token", response.token);
          this.checkAuthentication().subscribe(response=> {
            if(response) 
            {
              
            }
          });
        }
      }),
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          case 400:
            this.showErrorMessage("Login error", "Unable to login user");
            break;
        }
        return of(undefined)
      }));
  }

  checkAuthentication(): Observable<boolean>
  {
    if(!localStorage.getItem("token")) 
    {
      return of(false);
    }
    return this.http.get<User>(`${environment.baseUrl}/auth/me`)
    .pipe(
      tap(response=> {
        if(response!=null) {
          this.user = {...response} 
        }
      }),
      map(response=> !!response),
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          case 400:
            this.showErrorMessage("Login error", "Unable to login user");
            break;
        }
        return of(false)
      }));
  }

  logout(): Observable<User | undefined> {
    this.user = undefined;
    localStorage.removeItem("token");
    this.showSuccessMessage('Successful', 'User session closed');
    return of(this.currentUser());
  }

  currentUser() : User | undefined 
  {
    if(!this.user) return undefined;
    return  structuredClone(this.user);
  }
}