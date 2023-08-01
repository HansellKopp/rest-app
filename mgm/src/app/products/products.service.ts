import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core';
import { Product } from './interfaces/product-interface';
import { environment } from 'src/environments/environment.development';
import { Observable, map, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private http = inject(HttpClient);

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.baseUrl}/products`).pipe(
      map((products: Product[]) => products ),
      catchError((error) => {
        console.log(error)
        return of([])
      }));      
  }

  addProduct(data: Product): Observable<Product| undefined> {
    return this.http.post<Product>(`${environment.baseUrl}/products`, data).pipe(
      catchError((error) => {
        console.log(error)
        return of(undefined)
      }));      
  }

  getProductById(id: string): Observable<Product | undefined> {
    return this.http.get<Product>(`${environment.baseUrl}/products/${id}`).pipe(
      catchError((error) => {
        console.log(error)
        return of(undefined)
      }));      
  }

  deleteProductById(id: string): Observable<boolean> {
    return this.http.delete<Product>(`${environment.baseUrl}/products/${id}`).pipe(
      map(() => true ),
      catchError((error) => {
        return of(false)
      }));      
  }
}
