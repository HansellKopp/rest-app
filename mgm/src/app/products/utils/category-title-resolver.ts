import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { map, Observable, of } from "rxjs";
import { CategoriesService } from "../categories.service";

@Injectable({
  providedIn: 'root'
})
export class CategoryTitleResolver {
  categoriesService = inject(CategoriesService);
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): string | Observable<string> | Promise<string> {
    const id: string = route.params["id"]
    if (!id) {
      return of('Categories');
    }
    return this.categoriesService.getCategoryById(id).pipe(
      map(category => `Edit - ${category?.name}`)
    )
  }
}