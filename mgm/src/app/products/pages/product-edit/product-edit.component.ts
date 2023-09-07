import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../interfaces/product-interface';
import { CategoriesService } from '../../categories.service';
import { ProductsService } from '../../products.service';
import { FormControl, FormGroup } from '@angular/forms';
import { switchMap, tap } from 'rxjs';
import { Category } from '../../interfaces/category-interface';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  templateUrl: './product-edit.component.html',
  providers: [MessageService, ConfirmationService],
  styles: []
})
export class ProductEditComponent implements OnInit {
  listUrl = "/products";
  private categoriesUrl = "/categories";
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private productsService = inject(ProductsService);
  private categoriesService = inject(CategoriesService);
  private messageService = inject(MessageService);
  public loading: boolean = true;
  private confirmationService = inject(ConfirmationService);

  categories: Category[] = []
    
  public productForm = new FormGroup({
      id: new FormControl<string|null>(null),
      name: new FormControl<string>("", { nonNullable: true}),
      price: new FormControl<number>(0,{ nonNullable: true}),
      tax: new FormControl<number>(0,{ nonNullable: true}),
      category: new FormControl<Category>({} as Category,{  nonNullable: true}),
      image: new FormControl<string | null>(null),
  });
  
  ngOnInit(): void {
    this.loadCategories();
    if ( this.router.url.includes('new') ) {
      this.loading = false;
      return;
    }
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => {
          return this.productsService.getProductById(id)
        }),
      )
      .subscribe(data => {
        if(!data) return this.router.navigateByUrl(this.listUrl)
        this.productForm.reset(data);
        this.loading = false;
        return;
    });
  }

  goProducts() {
    setTimeout(() => {
      this.router.navigateByUrl(`${this. listUrl}`);                
    }, 1000);
  }

  loadCategories(): void {
    this.categoriesService.getCategories()
        .subscribe(data => {
          if(!data.length) return this.router.navigateByUrl(this.categoriesUrl)
          this.categories = data;
      return;
  });
  }

  deleteProduct() {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete ' + this.currentProduct .name + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.productsService.deleteProductById(this.currentProduct .id).subscribe((success: boolean)=> {
              if(!success) {
                return;
              }
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
              this.goProducts();
            })
        }
    });
  }

  get currentProduct(): Product {
    return this.productForm.value as Product
  }

  onSubmit(): void {
    if(!this.productForm.valid) {
      return;
    }
    if(this.currentProduct.id) {
      this.productsService.updateProduct(this.currentProduct)
      .pipe(          
        tap((success: boolean)=> {
            if(success) {
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product updated', life: 3000 })
              this.goProducts();
            }
          })
        ).subscribe();
        return;
    } 
    this.productsService.addProduct(this.currentProduct)
      .pipe(          
        tap((product: Product | undefined)=> {
          if(product) {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product created', life: 3000 }),
            this.router.navigateByUrl(`${this. listUrl}/${product!.id}`);
          }
        })
      ).subscribe()
  }

  onCancel(): void {
    this.router.navigateByUrl(this.listUrl)
  }
}
