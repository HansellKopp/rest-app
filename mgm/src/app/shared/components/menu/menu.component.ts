import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { AvatarModule } from "primeng/avatar";
import { ToolbarModule } from 'primeng/toolbar';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { PanelMenuModule } from 'primeng/panelmenu';

@Component({
  selector: 'shared-menu',
  templateUrl: './menu.component.html',
  standalone: true,
  imports: [
    ButtonModule,
    SidebarModule,
    AvatarModule,
    ToolbarModule,
    PanelMenuModule
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
