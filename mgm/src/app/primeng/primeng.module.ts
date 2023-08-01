import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { AvatarModule } from "primeng/avatar";
import { ToolbarModule } from 'primeng/toolbar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PanelModule } from 'primeng/panel';
import { TableModule} from "primeng/table"
import { InputTextModule} from "primeng/inputtext"
import { ToastModule } from "primeng/toast";
import { DialogModule } from "primeng/dialog";
import {  } from "primeng/confirmdialog";

@NgModule({
  declarations: [],
  exports: [
    SidebarModule,
    ButtonModule,
    AvatarModule,
    ToolbarModule,
    PanelMenuModule,
    PanelModule,
    TableModule,
    InputTextModule,
    ToastModule,
    DialogModule
  ]
})
export class PrimengModule { }
