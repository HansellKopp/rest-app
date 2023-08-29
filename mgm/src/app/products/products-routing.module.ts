import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { ProductEditComponent } from './pages/product-edit/product-edit.component';
import { ProductsLayoutComponent } from './pages/products-layout/products-layout.component';
import { CategoriesListComponent } from './pages/categories-list/categories-list.component';
import { CategoryEditComponent } from './pages/category-edit/category-edit.component';

const routes: Routes = [{
  path: '', // "/products"
  component: ProductsLayoutComponent,
  children: [
    { path: "", component: ProductsListComponent },
    { path: "new", component: ProductEditComponent },
    { path: "categories", component: CategoriesListComponent },
    { path: "categories/new", component: CategoryEditComponent },
    { path: "categories/:id", component: CategoryEditComponent },
    { path: ":id", component: ProductEditComponent },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
