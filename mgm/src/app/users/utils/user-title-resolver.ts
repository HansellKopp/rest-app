import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { map, Observable, of } from "rxjs";
import { UsersService } from "../users-service";

@Injectable({
  providedIn: 'root'
})
export class UserTitleResolver {
  usersService = inject(UsersService);
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): string | Observable<string> | Promise<string> {
    const id: string = route.params["id"]
    if (!id) {
      return of('Users');
    }
    return this.usersService.getUserById(id).pipe(
      map(user => `Edit - ${user?.username}`)
    )
  }
}