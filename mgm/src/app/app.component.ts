import { Component, inject } from '@angular/core';
import { AuthService } from './auth/services/auth-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mgm';
  private authService = inject(AuthService);

  constructor() {
    this.authService.getCurrentUser();
  }
}
