import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { UsersLayoutComponent } from './pages/users-layout/users-layout.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { UserEditComponent } from './pages/user-edit/user-edit.component';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { UserTitleResolver } from './utils/user-title-resolver';

const routes: Routes = [
  { path: '', // "/users"
    component: UsersLayoutComponent,
    children: [
      { path: "", component: UsersListComponent, title: "Users list" },
      { path: "new", component: UserEditComponent, title: "New user" },
      { path: "profile", component: UserProfileComponent, title: "User profile" },
      { path: ":id", component: UserEditComponent, 
        title: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(UserTitleResolver).resolve(route,state)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
