import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { Category } from '../../interfaces/category-interface';
import { CategoriesService } from '../../categories.service';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [
  ]
})
export class CategoriesListComponent {
  baseUrl = "products/categories"
  private router = inject(Router);
  private categoriesService = inject(CategoriesService);
  categories: Category[] = [];

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe(value=> this.categories = value);
  }

  addCategory(): void {
    this.router.navigateByUrl(`${this.baseUrl}/new`);
  }

  editCategory(product: Category): void {
    this.router.navigateByUrl(`/Categories/${product.id}`);
  }

  clear(table: Table) {
    table.clear();
  }

  filter($event: any,table: Table) {
    const value = $event.target.value as string;
    table.filterGlobal(value.toLowerCase(), 'contains');
  }

}
