import { Component, OnInit } from '@angular/core';
import { MenuItem, PrimeIcons } from 'primeng/api';
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
  sidebarVisible: boolean = true;
  icon = PrimeIcons.BARS
  items: MenuItem[] = [];

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
