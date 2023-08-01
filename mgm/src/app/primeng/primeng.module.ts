import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { AvatarModule } from "primeng/avatar";
import { ToolbarModule } from 'primeng/toolbar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PanelModule } from 'primeng/panel';
import { TableModule} from "primeng/table"
import { InputTextModule} from "primeng/inputtext"
import { InputNumberModule } from "primeng/inputnumber";
import { TreeSelectModule } from 'primeng/treeselect';
import { ToastModule } from "primeng/toast";
import { DialogModule } from "primeng/dialog";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { ProgressBarModule } from "primeng/progressbar";
import { DropdownModule } from "primeng/dropdown";

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
    InputNumberModule,
    TreeSelectModule,
    ToastModule,
    DialogModule,
    ConfirmDialogModule,
    ProgressBarModule,
    ProgressSpinnerModule,
    DropdownModule
  ]
})
export class PrimengModule { }
