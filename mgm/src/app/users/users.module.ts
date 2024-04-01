import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from '../primeng/primeng.module';
import { ReactiveFormsModule } from '@angular/forms';

import { UsersRoutingModule } from './users-routing.module';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { UsersLayoutComponent } from './pages/users-layout/users-layout.component';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { UserEditComponent } from './pages/user-edit/user-edit.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    UserProfileComponent,
    UsersLayoutComponent,
    UsersListComponent,
    UserEditComponent
  ],
  imports: [
    CommonModule,
    PrimengModule,
    ReactiveFormsModule,
    UsersRoutingModule,
    TranslateModule
  ]
})
export class UsersModule { }
