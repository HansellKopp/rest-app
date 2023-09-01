import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './users-layout.component.html',
})
export class UsersLayoutComponent {
  private activatedRoute = inject(Router);
  private path = this.activatedRoute.url.split("/");
  title = (this.path[2] ?? "");
}
