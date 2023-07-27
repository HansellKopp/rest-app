import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsListComponent } from './products-list/products-list.component';
import { GroupsListComponent } from './groups-list/groups-list.component';

@NgModule({
  declarations: [
    ProductsListComponent,
    GroupsListComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ProductsListComponent
  ]
})
export class ProductsModule { }
