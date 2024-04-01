import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable, inject } from '@angular/core';
import { Product } from './interfaces/product-interface';
import { environment } from 'src/environments/environment.development';
import { Observable, map, catchError, of } from 'rxjs';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private http = inject(HttpClient);
  private translateService = inject(TranslateService);
  private messageService = inject(MessageService);

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
        return of(undefined)
      }));
  }

  getProductById(id: string): Observable<Product | undefined> {
    return this.http.get<Product>(`${environment.baseUrl}/products/${id}`).pipe(
      catchError((error) => {
        this.showErrorMessage(error);
        return of(undefined)
      }));      
  }

  deleteProductById(id: string): Observable<boolean> {
    return this.http.delete<Product>(`${environment.baseUrl}/products/${id}`).pipe(
      map(() => true ),
      catchError((error) => {
        this.showErrorMessage(error);
        return of(false)
      }));      
  }

  updateProduct(data: Product): Observable<boolean> {
    return this.http.put<boolean>(`${environment.baseUrl}/products/${data.id}`, data).pipe(
      map(()=> true),
      catchError((error) => {
        this.showErrorMessage(error);
        return of(false)
      }));      
  }

}
