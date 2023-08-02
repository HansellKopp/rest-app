import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { ProductNewComponent } from './pages/product-new/product-new.component';
import { ProductEditComponent } from './pages/product-edit/product-edit.component';
import { ProductsLayoutComponent } from './pages/products-layout/products-layout.component';

const routes: Routes = [{
  path: '',
  component: ProductsLayoutComponent,
  children: [
    { path: "", component: ProductsListComponent },
    { path: "new", component: ProductNewComponent },
    { path: ":id", component: ProductEditComponent },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
