import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from './shared/page404/page404.component';
import { canActivateGuard, canMatchGuard, publicGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  { 
    path: "products", 
    canActivate:  [canActivateGuard],
    canMatch: [canMatchGuard],
    loadChildren: () => import('./products/products.module').then(m => m.ProductsModule),
  },
  { 
    path: "users", 
    canActivate:  [canActivateGuard],
    canMatch: [canMatchGuard],
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
  },
  { 
    path: "login", 
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [publicGuard],
    canMatch: [publicGuard]
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
