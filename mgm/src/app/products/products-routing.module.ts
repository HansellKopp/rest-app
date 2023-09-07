import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { ProductEditComponent } from './pages/product-edit/product-edit.component';
import { ProductsLayoutComponent } from './pages/products-layout/products-layout.component';
import { CategoriesListComponent } from './pages/categories-list/categories-list.component';
import { CategoryEditComponent } from './pages/category-edit/category-edit.component';
import { ProductTitleResolver } from './utils/product-title-resolver';
import { CategoryTitleResolver } from './utils/category-title-resolver';

const routes: Routes = [{
  path: '', // "/products"
  component: ProductsLayoutComponent,
  children: [
    { path: "", component: ProductsListComponent, title: "Products" },
    { path: "new", component: ProductEditComponent, title: "New product" },
    { path: "categories", component: CategoriesListComponent, title: "Categories" },
    { path: "categories/new", component: CategoryEditComponent, title: "New category" },
    { path: "categories/:id", component: CategoryEditComponent, 
      title: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(CategoryTitleResolver).resolve(route,state)
    },
    { path: ":id", component: ProductEditComponent, 
      title: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(ProductTitleResolver).resolve(route,state) 
    },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
