import { Component, OnInit, inject } from '@angular/core';
import { Product } from '../../interfaces/product-interface';
import { Router } from '@angular/router';
import { ProductsService } from '../../products.service';

@Component({
  templateUrl: './product-new.component.html',
  styles: [
  ]
})
export class ProductNewComponent  {
  private router = inject(Router);
  private productsService = inject(ProductsService);

  saveProduct(product: Product) {
    this.productsService.addProduct(product).subscribe(response=> console.log(response));
  }
}
