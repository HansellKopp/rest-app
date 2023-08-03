import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../interfaces/product-interface';
import { CategoriesService } from '../../categories.service';
import { ProductsService } from '../../products.service';
import { FormControl, FormGroup } from '@angular/forms';
import { delay, switchMap, tap, filter, pipe, catchError, of } from 'rxjs';
import { Category } from '../../interfaces/category-interface';
import { MessageService } from 'primeng/api';

@Component({
  templateUrl: './product-edit.component.html',
  providers: [],
  styles: []
})
export class ProductEditComponent implements OnInit, OnDestroy {
  private listUrl = "/products";
  private categoriesUrl = "/categories";
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private productsService = inject(ProductsService);
  private categoriesService = inject(CategoriesService);
  private messageService = inject(MessageService);
  public loading: boolean = true;

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
    if ( this.router.url.includes('new') ) {
      this.loadCategories();
      return;
    }
    this.activatedRoute.params
      .pipe(
        delay(300),
        switchMap(({ id }) => {
          return this.productsService.getProductById(id)
        }),
        tap(()=> this.loadCategories()),
      )
      .subscribe(data => {
        if(!data) return this.router.navigateByUrl(this.listUrl)
        this.productForm.reset(data);
        return;
    });
  }

  loadCategories(): void {
    this.categoriesService.getCategories()
        .subscribe(data => {
          if(!data.length) return this.router.navigateByUrl(this.categoriesUrl)
          this.categories = data;
          this.loading = false;
      return;
  });
  }

  ngOnDestroy(): void {
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
          filter((e:boolean)=> e),
          tap(()=>this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product updated', life: 3000 }))
        ).subscribe();
        return;
    } 
    this.productsService.addProduct(this.currentProduct)
        .subscribe((response)=> {
          if(response) {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product created', life: 3000 }),
            this.router.navigateByUrl(`${this. listUrl}/${response!.id}`);
        }
      })
  }

  onCancel(): void {
    this.router.navigateByUrl(this.listUrl)
  }
}
