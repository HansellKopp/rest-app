import { Table } from 'primeng/table';
import { Component, OnInit, inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Product } from '../../interfaces/product-interface';
import { ProductsService } from '../../products.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './products-list.component.html',
  providers: [MessageService]
})
export class ProductsListComponent implements OnInit {
  private router = inject(Router);
  private productsService = inject(ProductsService);
  products: Product[] = [];

  ngOnInit(): void {
    this.productsService.getProducts().subscribe(value=> this.products = value);
  }

  addProduct(): void {
    this.router.navigateByUrl("/products/new");
  }

  editProduct(product: Product): void {
    this.router.navigateByUrl(`/products/${product.id}`);
  }

  clear(table: Table) {
    table.clear();
  }

  filter($event: any,table: Table) {
    const value = $event.target.value as string;
    table.filterGlobal(value.toLowerCase(), 'contains');
  }

}
