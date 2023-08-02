import { NgModule } from '@angular/core';
import { MenuComponent } from '../components/menu/menu.component';
import { Page404Component } from '../page404/page404.component';

@NgModule({
  declarations: [
    Page404Component
  ],
  imports: [
    MenuComponent,
  ],
  exports: [
    MenuComponent,
    Page404Component
  ]
})
export class SharedModule { }
