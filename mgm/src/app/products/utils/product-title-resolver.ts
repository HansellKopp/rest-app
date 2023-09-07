import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { map, Observable, of } from "rxjs";
import { ProductsService } from "../products.service";

@Injectable({
  providedIn: 'root'
})
export class ProductTitleResolver {
  productsService = inject(ProductsService);
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): string | Observable<string> | Promise<string> {
    const id: string = route.params["id"]
    if (!id) {
      return of('Products');
    }
    return this.productsService.getProductById(id).pipe(
      map(product => `Edit - ${product?.name}`)
    )
  }
}