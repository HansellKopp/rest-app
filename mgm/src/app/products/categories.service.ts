import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable, inject } from '@angular/core';
import { Category } from './interfaces/category-interface';
import { environment } from 'src/environments/environment.development';
import { Observable, map, catchError, of } from 'rxjs';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private http = inject(HttpClient);
  private messageService = inject(MessageService);
  private translateService = inject(TranslateService);

  showErrorMessage(error: HttpErrorResponse): void {
    const summary = error.statusText;
    let detail = error.message;
    switch (error.status) {
      case 400:
        detail = this.translateService.instant("API.ERROR.400");
        break;
      case 401:
        detail = this.translateService.instant("API.ERROR.401");
        break;
      case 404:
        detail = this.translateService.instant("API.ERROR.404");
        break;
    }
    this.messageService.add({ severity: "error", summary, detail, life: 3000 })
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.baseUrl}/categories`)
    .pipe(
      map((categories: Category[]) => categories ),
      catchError((error) => {
         this.showErrorMessage(error);
         return of([])
      }));      
  }

  addCategory(data: Category): Observable<Category| undefined> {
    return this.http.post<Category>(`${environment.baseUrl}/categories`, data).pipe(
      catchError((error) => {
        this.showErrorMessage(error);
        return of(undefined)
      }));      
  }

  getCategoryById(id: string): Observable<Category | undefined> {
    return this.http.get<Category>(`${environment.baseUrl}/categories/${id}`).pipe(
      catchError((error) => {
        this.showErrorMessage(error);
        return of(undefined)
      }));      
  }

  deleteCategoryById(id: string): Observable<boolean> {
    return this.http.delete<Category>(`${environment.baseUrl}/categories/${id}`).pipe(
      map(() => true ),
      catchError((error) => {
        this.showErrorMessage(error);
        return of(false)
      }));      
  }

  updateCategory(data: Category) {
    return this.http.put<boolean>(`${environment.baseUrl}/categories/${data.id}`, data).pipe(
      map(()=> true),
      catchError((error) => {
        this.showErrorMessage(error);
        return of(false)
      }));      
  }
}
