import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListComponent } from './features/products/products-list/products-list.component';
import { GroupsListComponent } from './features/products/groups-list/groups-list.component';

const routes: Routes = [
  { path: "groups", component: GroupsListComponent },
  { path: "products", component: ProductsListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
