import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from './shared/page404/page404.component';
import { canActivateGuard, canMatchGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  { 
    path: "products", 
    canActivate:  [canActivateGuard],
    canMatch: [canMatchGuard],
    loadChildren: () => import('./products/products.module').then(m => m.ProductsModule),
  },
  { 
    path: "login", 
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) 
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
