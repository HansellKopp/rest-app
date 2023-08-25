import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { AuthService } from 'src/app/auth/services/auth-service';
import { PrimengModule } from 'src/app/primeng/primeng.module';

@Component({
  selector: 'shared-menu',
  templateUrl: './menu.component.html',
  standalone: true,
  imports: [
    PrimengModule
  ]
})
export class MenuComponent implements OnInit {
  private router = inject(Router);
  private authService = inject(AuthService);
  private isLogged: boolean = false;
  
  sidebarVisible: boolean = false;
  icon = PrimeIcons.BARS
  items: MenuItem[] = [];

  logout() {
    this.authService.logout().subscribe(user=>{
        if(!user) {
            this.isLogged = false;
            this.router.navigateByUrl("/login")
        }
    });
  }

  ngOnInit() {
        this.items = [
            {
                label: 'Products',
                icon: 'pi pi-fw pi-file',
                items: [
                    {
                        label: 'Groups',
                        icon: 'pi list',
                        routerLink: ['groups']

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
