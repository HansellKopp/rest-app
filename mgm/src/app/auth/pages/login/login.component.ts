import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { MessageService } from 'primeng/api';
import { FormControl, FormGroup } from '@angular/forms';
import { tap } from 'rxjs';
import { AuthRequest, AuthResponse } from '../../interfaces/auth.interface';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private url = "/auth";
  private router = inject(Router);
  private authService = inject(AuthService);
  private messageService = inject(MessageService);
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
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User logged successfuly', life: 3000 }),
            this.router.navigateByUrl("/");
          }
        })
      ).subscribe()
  }
}
