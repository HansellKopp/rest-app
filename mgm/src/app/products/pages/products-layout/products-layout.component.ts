import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './products-layout.component.html',
  styles: [
  ]
})
export class ProductsLayoutComponent  {
  private activatedRoute = inject(Router);
  private path = this.activatedRoute.url.split("/");
  title = (this.path[2] ?? "") === "categories" ? "Categories": "Products";
}
