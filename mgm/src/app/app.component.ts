import { Component, inject } from '@angular/core';
import { AuthService } from './auth/services/auth-service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mgm';
  private authService = inject(AuthService);
  private translate: TranslateService = inject(TranslateService);

  constructor() {
    this.authService.getCurrentUser();
    this.translate.setDefaultLang('en');
    this.translate.use(this.translate.getBrowserLang()||'en');
  }
}
