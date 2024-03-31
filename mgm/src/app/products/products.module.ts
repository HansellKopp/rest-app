import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from '../primeng/primeng.module';
import { ReactiveFormsModule } from '@angular/forms';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { ProductEditComponent } from './pages/product-edit/product-edit.component';
import { ProductsLayoutComponent } from './pages/products-layout/products-layout.component';
import { CategoriesListComponent } from './pages/categories-list/categories-list.component';
import { CategoryEditComponent } from './pages/category-edit/category-edit.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ProductsListComponent,
    ProductEditComponent,
    ProductsLayoutComponent,
    CategoriesListComponent,
    CategoryEditComponent,
  ],
  imports: [
    CommonModule,
    PrimengModule,
    ProductsRoutingModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  exports: [
  //   ProductsListComponent
  ]
})
export class ProductsModule { }
