import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { MessageService } from 'primeng/api';
import { FormControl, FormGroup } from '@angular/forms';
import { catchError, of, tap } from 'rxjs';
import { AuthRequest, AuthResponse } from '../../interfaces/auth.interface';
import { TranslateService } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private url = "/auth";
  private router = inject(Router);
  private authService = inject(AuthService);
  private translateService = inject(TranslateService);
  private messageService = inject(MessageService);
  public loading: boolean = true;

  public loginForm = new FormGroup({
    username: new FormControl<string|null>(null),
    password: new FormControl<string | null>(null),
});

get currentData(): AuthRequest {
  return this.loginForm.value as AuthRequest
}

showErrorMessage(detail: string): void {
  const summary = this.translateService.instant('AUTH.MESSAGES.LOGIN_ERROR');
  this.messageService.add({ severity: "error", summary, detail, life: 3000 })
}

onSubmit(): void {
  if(!this.loginForm.valid) {
      return;
    }
    this.authService.login(this.currentData)
      .pipe(          
        tap((result: AuthResponse | undefined)=> {
          if(result) {
            const summary = this.translateService.instant('AUTH.MESSAGES.SUCCESS');
            const detail = this.translateService.instant('AUTH.MESSAGES.LOGGED_IN');
            this.messageService.add({ severity: 'success', summary, detail, life: 3000 }),
            this.router.navigateByUrl("/");
          }
        }),
        catchError((error: HttpErrorResponse) => {
          switch (error.status) {
            case 400:
              const detail = this.translateService.instant('AUTH.MESSAGES.UNABLE_TO_LOGIN');
              this.showErrorMessage(detail);
              break;
          }
          return of(undefined)
        })
      ).subscribe()
  }
}
