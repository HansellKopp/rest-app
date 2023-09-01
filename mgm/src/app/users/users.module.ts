import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from '../primeng/primeng.module';
import { ReactiveFormsModule } from '@angular/forms';

import { UsersRoutingModule } from './users-routing.module';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { UsersLayoutComponent } from './pages/users-layout/users-layout.component';


@NgModule({
  declarations: [
    UserProfileComponent,
    UsersLayoutComponent
  ],
  imports: [
    CommonModule,
    PrimengModule,
    ReactiveFormsModule,
    UsersRoutingModule,
  ]
})
export class UsersModule { }
