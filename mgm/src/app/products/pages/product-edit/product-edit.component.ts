import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../interfaces/product-interface';
import { CategoriesService } from '../../categories.service';
import { ProductsService } from '../../products.service';
import { FormControl, FormGroup } from '@angular/forms';
import { delay, switchMap, tap } from 'rxjs';
import { Category } from '../../interfaces/category-interface';

@Component({
  templateUrl: './product-edit.component.html',
  styles: []
})
export class ProductEditComponent implements OnInit, OnDestroy {
  private listUrl = "/products";
  private categoriesUrl = "/categories";
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private productsService = inject(ProductsService);
  private categoriesService = inject(CategoriesService);

  category: Category | undefined;
  product: Product | undefined;
  categories: Category[] = []
    
  public productForm = new FormGroup({
      id: new FormControl<string>(""),
      name: new FormControl<string>("", { nonNullable: false}),
      price: new FormControl<number>(0,{ nonNullable: false}),
      tax: new FormControl<number>(0,{ nonNullable: false}),
      category: new FormControl<Category|null>(null),
      image: new FormControl<string | null>(null),
  });
  
  ngOnInit(): void {
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
        this.product = data;
        this.productForm.setValue(data);
        return;
    });
  }

  loadCategories(): void {
    this.categoriesService.getCategories()
        .subscribe(data => {
          if(!data.length) return this.router.navigateByUrl(this.categoriesUrl)
          this.categories = data;
      return;
  });
  }

  ngOnDestroy(): void {
    console.log("destroy")
  }

  onSubmit(): void {
    if(!this.productForm.valid) {
      return;
    }
    this.productsService.updateProduct({...this.productForm.value} as Product)
      .subscribe((response)=> {
        if(!response) return
        this.router.navigateByUrl(this.listUrl)
      });
  }

  onCancel(): void {
    this.router.navigateByUrl(this.listUrl)
  }
}
