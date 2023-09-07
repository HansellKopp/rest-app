import { Component, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  templateUrl: './products-layout.component.html',
  styles: []
})
export class ProductsLayoutComponent  {
  titleService = inject(Title);
}
