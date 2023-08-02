import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { ProductsRoutingModule } from './products-routing.module';
import { PrimengModule } from '../primeng/primeng.module';
import { ProductEditComponent } from './pages/product-edit/product-edit.component';
import { ProductsLayoutComponent } from './pages/products-layout/products-layout.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProductsListComponent,
    ProductEditComponent,
    ProductsLayoutComponent,
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
