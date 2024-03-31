import { JsonPipe, NgIf } from '@angular/common';
import { Component, OnInit, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { AuthService } from 'src/app/auth/services/auth-service';
import { PrimengModule } from 'src/app/primeng/primeng.module';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'shared-menu',
  templateUrl: './menu.component.html',
  standalone: true,
  styleUrls: ['./menu.component.scss'],
  imports: [
    PrimengModule,
    NgIf, JsonPipe,
    TranslateModule
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
  userMenuItems: MenuItem[] = [];

  logout() {
    this.authService.logout();
    this.router.navigateByUrl("/login");
  }

  ngOnInit() {
        this.userMenuItems = [
            {
            label: 'User options',
            items: [
                {
                    label: 'Profile',
                    icon: 'pi pi-fw pi-file',
                    routerLink: ['users/profile']
                },
                {
                    label: 'Logout',
                    icon: 'pi pi-fw pi-file',
                    command: () => {
                        this.logout();
                    }
                }

            ]
        }
        ]
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
                        icon: 'pi pi-fw pi-user-plus',
                        routerLink: ['users/new']
                    },
                    {
                        icon: 'pi pi-fw pi-bars',
                        label: 'List',
                        routerLink: ['users']
                    }
                ]
            },
        ];
      }
}
