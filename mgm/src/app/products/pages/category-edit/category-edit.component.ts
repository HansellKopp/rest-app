import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { switchMap, tap } from 'rxjs';
import { CategoriesService } from '../../categories.service';
import { Category } from '../../interfaces/category-interface';

@Component({
  templateUrl: './category-edit.component.html',
  styles: [],
  providers: [MessageService, ConfirmationService]
})
export class CategoryEditComponent implements OnInit {
  private listUrl = "/products/categories";
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private categoriesService = inject(CategoriesService);
  private messageService = inject(MessageService);
  public loading: boolean = true;
  private confirmationService = inject(ConfirmationService);

  public categoryForm = new FormGroup({
    id: new FormControl<string|null>(null),
    name: new FormControl<string>("", { nonNullable: true}),
  });
  
  goCategories() {
    setTimeout(() => {
      this.router.navigateByUrl(`${this. listUrl}`);                
    }, 1000);
  }

  ngOnInit(): void {
    if ( this.router.url.includes('new') ) {
      this.loading = false;
      return;
    }
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => {
          return this.categoriesService.getCategoryById(id)
        }),
      )
      .subscribe(data => {
        if(!data) return this.router.navigateByUrl(this.listUrl)
        this.categoryForm.reset(data);
        this.loading = false;
        return;
    });
  }

  deleteCategory() {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete ' + this.currentCategory .name + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.categoriesService.deleteCategoryById(this.currentCategory .id).subscribe((success: boolean)=> {
              if(!success) {
                return;
              }
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Category Deleted', life: 3000 });
              this.goCategories();
            })
        }
    });
  }

  get currentCategory(): Category {
    return this.categoryForm.value as Category
  }

  onSubmit(): void {
    if(!this.categoryForm.valid) {
      return;
    }
    if(this.currentCategory.id) {
      this.categoriesService.updateCategory(this.currentCategory)
      .pipe(          
        tap((success: boolean)=> {
            if(success) {
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Category updated', life: 3000 })
              this.goCategories();
            }
          })
        ).subscribe();
        return;
    } 
    this.categoriesService.addCategory(this.currentCategory)
      .pipe(          
        tap((product: Category | undefined)=> {
          if(product) {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Category created', life: 3000 }),
            this.goCategories();
          }
        })
      ).subscribe()
  }

  onCancel(): void {
    this.router.navigateByUrl(this.listUrl)
  }

}
