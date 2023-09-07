import { Component, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  templateUrl: './users-layout.component.html',
})
export class UsersLayoutComponent {
  titleService = inject(Title);
}
