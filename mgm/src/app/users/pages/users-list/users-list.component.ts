import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { User } from '../../interfaces/user.interface';
import { UsersService } from '../../users-service';

@Component({
  templateUrl: './users-list.component.html',  
})
export class UsersListComponent {
  baseUrl = "users"
  private router = inject(Router);
  private usersService = inject(UsersService);
  users: User[] = [];

  ngOnInit(): void {
    this.usersService.getUsers().subscribe(value=> this.users = value);
  }

  addUser(): void {
    this.router.navigateByUrl(`${this.baseUrl}/new`);
  }

  editUser(product: User): void {
    this.router.navigateByUrl(`${this.baseUrl}/${product.id}`);
  }

  clear(table: Table) {
    table.clear();
  }

  filter($event: any,table: Table) {
    const value = $event.target.value as string;
    table.filterGlobal(value.toLowerCase(), 'contains');
  }

}
