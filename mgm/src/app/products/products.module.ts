import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { ProductsRootComponent } from './pages/products-root/products-root.component';
import { ProductsRoutingModule } from './products-routing.module';
import { PrimengModule } from '../primeng/primeng.module';

@NgModule({
  declarations: [
    ProductsListComponent,
    ProductsRootComponent
  ],
  imports: [
    CommonModule,
    PrimengModule,
    ProductsRoutingModule
  ],
  exports: [
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
