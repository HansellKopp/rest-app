import { Component, inject } from '@angular/core';
import { Product } from '../../interfaces/products-interface';
import { ProductsService } from '../../products.service';

@Component({
  templateUrl: './products-list.component.html',
})
export class ProductsListComponent {
  private productsService = inject(ProductsService);
  products$ = this.productsService.getProducts();
  products: Product[] = [];
}
