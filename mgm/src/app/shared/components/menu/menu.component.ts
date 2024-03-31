import { JsonPipe, NgIf } from '@angular/common';
import { Component, OnInit, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { AuthService } from 'src/app/auth/services/auth-service';
import { PrimengModule } from 'src/app/primeng/primeng.module';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';

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
  private translateService = inject(TranslateService);
  private translations: Record<string, string> = {};
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

  loadtranslations() {
    const task$ = [];
    task$.push(this.translateService.get('SHARED.MENU.USER_OPTIONS'));
    task$.push(this.translateService.get('SHARED.MENU.PROFILE'));
    task$.push(this.translateService.get('SHARED.MENU.LOGOUT'));
    task$.push(this.translateService.get('SHARED.MENU.PRODUCTS'));
    task$.push(this.translateService.get('SHARED.MENU.CATEGORIES'));
    task$.push(this.translateService.get('SHARED.MENU.USERS.TITLE'));
    task$.push(this.translateService.get('SHARED.MENU.USERS.NEW'));
    task$.push(this.translateService.get('SHARED.MENU.USERS.LIST'));

    forkJoin(task$).subscribe((res: string[]) => {
        this.translations = {
            'SHARED.MENU.USER_OPTIONS': res[0],
            'SHARED.MENU.PROFILE': res[1],
            'SHARED.MENU.LOGOUT': res[2],
            'SHARED.MENU.PRODUCTS': res[3],
            'SHARED.MENU.CATEGORIES': res[4],
            'SHARED.MENU.USERS.TITLE': res[5],
            'SHARED.MENU.USERS.NEW': res[6],
            'SHARED.MENU.USERS.LIST': res[7]
        }
        this.loadMenu();
    });
  }

  loadMenu() {
    this.userMenuItems = [
        {
        label: this.translations['SHARED.MENU.USER_OPTIONS'],
        items: [
            {
                label: this.translations['SHARED.MENU.PROFILE'],
                icon: 'pi pi-fw pi-file',
                routerLink: ['users/profile']
            },
            {
                label: this.translations['SHARED.MENU.LOGOUT'],
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
            label: this.translations['SHARED.MENU.PRODUCTS'],
            icon: 'pi pi-fw pi-file',
            items: [
                {
                    label: this.translations['SHARED.MENU.CATEGORIES'],
                    icon: 'pi list',
                    routerLink: ['products/categories']

                },
                {
                    label: this.translations['SHARED.MENU.PRODUCTS'],
                    icon: 'pi file',
                    routerLink: ['products']
                },
            ]
        },
        {
            label: this.translations['SHARED.MENU.USERS.TITLE'],
            icon: 'pi pi-fw pi-user',
            items: [
                {
                    label: this.translations['SHARED.MENU.USERS.NEW'],
                    icon: 'pi pi-fw pi-user-plus',
                    routerLink: ['users/new']
                },
                {
                    label: this.translations['SHARED.MENU.USERS.LIST'],
                    icon: 'pi pi-fw pi-bars',
                    routerLink: ['users']
                }
            ]
        },
    ];
  }

  ngOnInit() {
    this.loadtranslations();    
    }
}
