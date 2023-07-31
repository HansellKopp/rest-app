import { Component } from '@angular/core';
import { PrimengModule } from 'src/app/primeng/primeng.module';

@Component({
  selector: 'app-products-root',
  templateUrl: './products-root.component.html',
  standalone: true,
  imports: [
    PrimengModule
  ]
})
export class ProductsRootComponent {

}
