import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { ProductsRoutingModule } from './products-routing.module';
import { PrimengModule } from '../primeng/primeng.module';
import { ProductEditComponent } from './pages/product-edit/product-edit.component';
import { ProductsLayoutComponent } from './pages/products-layout/products-layout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoriesListComponent } from './pages/categories-list/categories-list.component';
import { CategoryEditComponent } from './pages/category-edit/category-edit.component';

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
    ReactiveFormsModule
  ],
  exports: [
    ProductsListComponent
  ]
})
export class ProductsModule { }
