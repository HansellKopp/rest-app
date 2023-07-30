import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { AvatarModule } from "primeng/avatar";
import { ToolbarModule } from 'primeng/toolbar';

import { PanelMenuModule } from 'primeng/panelmenu';

@NgModule({
  declarations: [],
  imports: [
    SidebarModule,
    ButtonModule,
    AvatarModule,
    ToolbarModule,
    PanelMenuModule
  ],
  exports: [
    SidebarModule,
    ButtonModule,
    AvatarModule,
    ToolbarModule,
    PanelMenuModule
  ]
})
export class PrimengModule { }
