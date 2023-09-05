import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersLayoutComponent } from './pages/users-layout/users-layout.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { UserEditComponent } from './pages/user-edit/user-edit.component';
import { UsersListComponent } from './pages/users-list/users-list.component';

const routes: Routes = [
  { path: '', // "/users"
    component: UsersLayoutComponent,
    children: [
      { path: "", component: UsersListComponent },
      { path: "new", component: UserEditComponent },
      { path: "profile", component: UserProfileComponent },
      { path: ":id", component: UserEditComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
