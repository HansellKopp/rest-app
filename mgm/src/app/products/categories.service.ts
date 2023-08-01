import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core';
import { Category } from './interfaces/category-interface';
import { environment } from 'src/environments/environment.development';
import { Observable, map, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private http = inject(HttpClient);

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.baseUrl}/categories`).pipe(
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
        return of(false)
      }));      
  }
}
