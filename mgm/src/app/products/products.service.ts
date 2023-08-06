import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable, inject } from '@angular/core';
import { Product } from './interfaces/product-interface';
import { environment } from 'src/environments/environment.development';
import { Observable, map, catchError, of } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private http = inject(HttpClient);
  private messageService = inject(MessageService);

  showErrorMessage(summary: string, detail: string): void {
    this.messageService.add({ severity: "error", summary, detail, life: 3000 })
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.baseUrl}/products`).pipe(
      map((products: Product[]) => products ),
      catchError((error) => {
        console.log(error)
        return of([])
      }));      
  }

  addProduct(data: Product): Observable<Product| undefined> {
    return this.http.post<Product>(`${environment.baseUrl}/products`, data)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.status == 400) {
          this.showErrorMessage("Server error", "Unable to create product");
          return of(undefined)
        } else {
          throw error;
        }
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

  updateProduct(data: Product): Observable<boolean> {
    return this.http.put<boolean>(`${environment.baseUrl}/products/${data.id}`, data).pipe(
      map(()=> true),
      catchError((error) => {
        console.log(error)
        return of(false)
      }));      
  }

}
