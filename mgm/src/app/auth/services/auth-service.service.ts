import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { AuthRequest, AuthResponse } from '../interfaces/auth.interface';
import { Observable, catchError, of, tap } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
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
          this.user = { username: data.username, roles: ['admin']} 
          localStorage.setItem("token", response.token);
          this.showSuccessMessage('Successful', 'User logged');
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
