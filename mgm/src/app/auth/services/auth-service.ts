import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { AuthRequest, AuthResponse } from '../interfaces/auth.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router: Router = inject(Router);
  private messageService = inject(MessageService);
  public user = signal<User | undefined>(undefined)
  public isLogged = signal<boolean>(false)

  clearUser() {
    this.isLogged.set(false);
    this.user.set(undefined);
    localStorage.clear();
  }

  showErrorMessage(summary: string, detail: string): void {
    this.messageService.add({ severity: "error", summary, detail, life: 3000 })
  }

  login(data: AuthRequest): Observable<AuthResponse| undefined> {
    this.clearUser();
    return this.http.post<AuthResponse>(`${environment.baseUrl}/auth`, data)
    .pipe(
      tap(response=> {
        if(response.token) {
          this.isLogged.set(true);
          localStorage.setItem("token", response.token);
          this.getCurrentUser();
          this.router.navigate(['/']);
        }
      }));
  }

  getCurrentUser(): void
  {
    if(!localStorage.getItem("token")) 
    {
      this.clearUser();
      return
    }
    this.http.get<User>(`${environment.baseUrl}/auth/me`)
    .pipe(
      tap(response=> {
        if(response!=null) {
          this.isLogged.set(true);
          this.user.set({...response});
        }
      }),
      map(response=> !!response),
      catchError((error: HttpErrorResponse) => {
        this.clearUser();
        switch (error.status) {
          case 400:
            this.showErrorMessage("Login error", "Unable to login user");
            break;
        }
        return of(false)
      })).subscribe();
  }

  logout() {
    this.clearUser();
  }

  refreshToken() {
    return this.http.get<AuthResponse>(`${environment.baseUrl}/auth/refresh-token`)
    .pipe(
      tap(response=> {
        if(response.token) {
          this.isLogged.set(true);
          localStorage.setItem("token", response.token);
        } else {
          this.clearUser();
        }
      }));
  }
}
