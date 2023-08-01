import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../interfaces/product-interface';
import { CategoriesService } from '../../categories.service';
import { ProductsService } from '../../products.service';
import { FormControl, FormGroup } from '@angular/forms';
import { delay, map, switchMap } from 'rxjs';
import { TreeNode } from 'primeng/api/treenode';

@Component({
  templateUrl: './product-edit.component.html',
  styles: []
})
export class ProductEditComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private productsService = inject(ProductsService);
  private categoriesService = inject(CategoriesService);

  product: Product | undefined;
  categories: TreeNode<any>[] = []
    
  public productForm = new FormGroup({
      id: new FormControl<string | null>(null),
      name: new FormControl<string>("", { nonNullable: true}),
      price: new FormControl<number>(0,{ nonNullable: true}),
      tax: new FormControl<number>(0,{ nonNullable: true}),
      categoryId: new FormControl<string |null>(null),
      image: new FormControl<string | null>(null),
  });
  
  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        delay(300),
        switchMap(({ id }) => {
          return this.productsService.getProductById(id)
        })
      )
      .subscribe(data => {
        if(!data) return this.router.navigateByUrl("/products")
        this.loadCategories();
        this.product = data;
        return;
    });
  }

  loadCategories(): void {
    this.categoriesService.getCategories()
      .pipe(
        map(data => {
          return data.map(category=> ({
            label: category.name,
            data: category.id
          } as TreeNode))
        })
      )
      .subscribe(data => {
        if(!data.length) return this.router.navigateByUrl("/categories")
        this.categories = data;
        console.log({data})
      return;
  });
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  save(): void {

  }
}
