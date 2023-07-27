import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { AvatarModule } from "primeng/avatar"

@NgModule({
  declarations: [],
  imports: [
    SidebarModule,
    ButtonModule,
    AvatarModule
  ],
  exports: [
    SidebarModule,
    ButtonModule,
    AvatarModule
  ]
})
export class PrimengModule { }
