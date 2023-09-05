import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable, map, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private http = inject(HttpClient);
  private messageService = inject(MessageService);
  showErrorMessage(summary: string, detail: string): void {
    this.messageService.add({ severity: "error", summary, detail, life: 3000 })
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.baseUrl}/users`).pipe(
      map((users: User[]) => users ),
      catchError((error) => {
        console.log(error)
        return of([])
      }));      
  }

  addUser(data: User): Observable<User | undefined> {
    return this.http.post<User>(`${environment.baseUrl}/users`, data)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          case 400:
            this.showErrorMessage("Server error", "Unable to create user");                        
            break;
          case 401:
            this.showErrorMessage("Server error", "Unauthorized, unable to create user");            
            break;          
        }
        return of(undefined)
      }));
  }

  getUserById(id: string): Observable<User | undefined> {
    return this.http.get<User>(`${environment.baseUrl}/users/${id}`).pipe(
      catchError((error) => {
        console.log(error)
        return of(undefined)
      }));      
  }

  deleteUserById(id: string): Observable<boolean> {
    return this.http.delete<User>(`${environment.baseUrl}/users/${id}`).pipe(
      map(() => true ),
      catchError((error) => {
        switch (error.status) {
          case 404:
            this.showErrorMessage("Server error", "User not found");
            break;
          case 401:
            this.showErrorMessage("Server error", "Unauthorized, unable to delete user");            
            break;          
        }
        return of(false)
      }));      
  }

  updateUser(data: User): Observable<boolean> {
    return this.http.put<boolean>(`${environment.baseUrl}/users/${data.id}`, data).pipe(
      map(()=> true),
      catchError((error) => {
        switch (error.status) {
          case 404:
            this.showErrorMessage("Server error", "User not found");
            break;
          case 401:
            this.showErrorMessage("Server error", "Unauthorized, unable to update user");            
            break;          
        }
        return of(false)
      }));      
  }

  getUserProfile(): Observable<User | undefined> {
    return this.http.get<User>(`${environment.baseUrl}/users/profile`).pipe(
      catchError((error) => {
        console.log(error)
        return of(undefined)
      }));      
  }

  updateProfile(data: User): Observable<boolean> {
    return this.http.put<boolean>(`${environment.baseUrl}/users/profile`, data).pipe(
      map(()=> true),
      catchError((error) => {
        switch (error.status) {
          case 404:
            this.showErrorMessage("Server error", "User not found");
            break;
          case 401:
            this.showErrorMessage("Server error", "Unauthorized, unable to update user");            
            break;          
        }
        return of(false)
      }));      
  }
}
