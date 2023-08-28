import { JsonPipe, NgIf } from '@angular/common';
import { Component, OnInit, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { AuthService } from 'src/app/auth/services/auth-service';
import { PrimengModule } from 'src/app/primeng/primeng.module';

@Component({
  selector: 'shared-menu',
  templateUrl: './menu.component.html',
  standalone: true,
  styles: [`
    :host ::ng-deep .p-toolbar {
        border-radius: 0;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.03), 0px 0px 2px rgba(0, 0, 0, 0.06), 0px 2px 6px rgba(0, 0, 0, 0.12) !important;
    } 
  `],
  imports: [
    PrimengModule,
    NgIf, JsonPipe
  ]
})
export class MenuComponent implements OnInit {
  private router = inject(Router);
  private authService = inject(AuthService);
  user = computed(()=> this.authService.user())
  isLogged = computed(()=> !!this.user())
  initials = computed(()=> `${this.user()?.firstName[0]} ${this.user()?.lastName[0]}`)  
  sidebarVisible: boolean = false;
  icon = PrimeIcons.BARS
  items: MenuItem[] = [];

  logout() {
    this.authService.logout();
    this.router.navigateByUrl("/login");
  }

  ngOnInit() {
        this.items = [
            {
                label: 'Products',
                icon: 'pi pi-fw pi-file',
                items: [
                    {
                        label: 'Categories',
                        icon: 'pi list',
                        routerLink: ['products/categories']

                    },
                    {
                        label: 'Products',
                        icon: 'pi file',
                        routerLink: ['products']
                    },
                ]
            },
            {
                label: 'Users',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'New',
                        icon: 'pi pi-fw pi-user-plus'
                    },
                    {
                        label: 'Delete',
                        icon: 'pi pi-fw pi-user-minus'
                    },
                    {
                        label: 'Search',
                        icon: 'pi pi-fw pi-users',
                        items: [
                            {
                                label: 'Filter',
                                icon: 'pi pi-fw pi-filter',
                                items: [
                                    {
                                        label: 'Print',
                                        icon: 'pi pi-fw pi-print'
                                    }
                                ]
                            },
                            {
                                icon: 'pi pi-fw pi-bars',
                                label: 'List'
                            }
                        ]
                    }
                ]
            },
        ];
      }
}
