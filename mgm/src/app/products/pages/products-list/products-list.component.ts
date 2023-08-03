import { Table } from 'primeng/table';
import { Component, OnInit, inject } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Product } from '../../interfaces/product-interface';
import { ProductsService } from '../../products.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './products-list.component.html',
  providers: [MessageService, ConfirmationService]
})
export class ProductsListComponent implements OnInit {
  private router = inject(Router);
  private productsService = inject(ProductsService);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);
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

  deleteProduct(product: Product) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete ' + product.name + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.productsService.deleteProductById(product.id).subscribe(()=> {
              this.products = this.products.filter((val) => val.id !== product.id);
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
            })
        }
    });
}

  clear(table: Table) {
    table.clear();
  }

  filter($event: any,table: Table) {
    const value = $event.target.value as string;
    table.filterGlobal(value.toLowerCase(), 'contains');
  }

}
