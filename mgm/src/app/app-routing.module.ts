import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from './shared/page404/page404.component';

const routes: Routes = [
  { 
    path: "products", 
    loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) 
  },
  {
    path: "404",
    component: Page404Component
  },
  {
    path: "",
    redirectTo: "products",
    pathMatch: "full"
  },
  {
    path: '**',
    redirectTo: '404',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
