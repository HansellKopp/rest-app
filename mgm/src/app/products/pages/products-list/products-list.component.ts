import { Component, inject } from '@angular/core';
import { Product } from '../../interfaces/products-interface';
import { ProductsService } from '../../products.service';
import { Table } from 'primeng/table';

@Component({
  templateUrl: './products-list.component.html',
})
export class ProductsListComponent {
  private productsService = inject(ProductsService);
  products$ = this.productsService.getProducts();
  products: Product[] = [];

  editProduct(product: Product): void {
    console.log(product)
  }

  deleteProduct(product: Product): void {
    console.log(product)
  }

  clear(table: Table) {
    table.clear();
  }

  filter($event: any,table: Table) {
    const value = $event.target.value as string
    table.filterGlobal(value.toLowerCase(), 'contains')
  }

}
