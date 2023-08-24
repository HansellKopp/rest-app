import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';
import { FormControl, FormGroup } from '@angular/forms';
import { tap } from 'rxjs';
import { AuthRequest, AuthResponse } from '../../interfaces/auth.interface';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private router = inject(Router);
  private authService = inject(AuthServiceService);
  public loading: boolean = true;

  public loginForm = new FormGroup({
    username: new FormControl<string|null>(null),
    password: new FormControl<string | null>(null),
});

get currentData(): AuthRequest {
  return this.loginForm.value as AuthRequest
}

onSubmit(): void {
  if(!this.loginForm.valid) {
      return;
    }
    this.authService.login(this.currentData)
      .pipe(          
        tap((result: AuthResponse | undefined)=> {
          if(result) {
            this.router.navigateByUrl("/");
          }
        })
      ).subscribe()
  }
}
