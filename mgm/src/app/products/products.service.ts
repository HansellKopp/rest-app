import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core';
import { Product } from './interfaces/products-interface';
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
}
