import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core';
import { Category } from './interfaces/category-interface';
import { environment } from 'src/environments/environment.development';
import { Observable, map, catchError, of } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private http = inject(HttpClient);
  private messageService = inject(MessageService);

  showErrorMessage(summary: string, detail: string): void {
    this.messageService.add({ severity: "error", summary, detail, life: 3000 })
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.baseUrl}/categories`)
    .pipe(
      map((categories: Category[]) => categories ),
      catchError((error) => {
         console.log(error)
         return of([])
      }));      
  }

  addCategory(data: Category): Observable<Category| undefined> {
    return this.http.post<Category>(`${environment.baseUrl}/categories`, data).pipe(
      catchError((error) => {
        console.log(error)
        return of(undefined)
      }));      
  }

  getCategoryById(id: string): Observable<Category | undefined> {
    return this.http.get<Category>(`${environment.baseUrl}/categories/${id}`).pipe(
      catchError((error) => {
        console.log(error)
        return of(undefined)
      }));      
  }

  deleteCategoryById(id: string): Observable<boolean> {
    return this.http.delete<Category>(`${environment.baseUrl}/categories/${id}`).pipe(
      map(() => true ),
      catchError((error) => {
        switch (error.status) {
          case 400:
            this.showErrorMessage("Server error", "Category not found");
            break;
          case 401:
            this.showErrorMessage("Server error", "Unauthorized, unable to delete a category");            
            break;
          case 409:
              this.showErrorMessage("Server error", "unable to delete a category with products");            
              break;      
        }
        return of(false)
      }));      
  }

  updateCategory(data: Category) {
    return this.http.put<boolean>(`${environment.baseUrl}/categories/${data.id}`, data).pipe(
      map(()=> true),
      catchError((error) => {
        switch (error.status) {
          case 404:
            this.showErrorMessage("Server error", "Category not found");
            break;
          case 401:
            this.showErrorMessage("Server error", "Unauthorized, unable to update category");            
            break;          
        }
        return of(false)
      }));      
  }
}
