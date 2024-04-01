import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { tap } from 'rxjs';
import { MessageService } from 'primeng/api';
import { UsersService } from '../../users-service';
import { User } from '../../interfaces/user.interface';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: './user-profile.component.html',
  providers: [MessageService],
})
export class UserProfileComponent implements OnInit {
  private router = inject(Router);
  private usersService = inject(UsersService);
  private messageService = inject(MessageService);
  private translateService = inject(TranslateService);
  public loading: boolean = true;
    
  public profileForm = new FormGroup({
      id: new FormControl<string|null>(null),
      firstName: new FormControl<string>("", { nonNullable: true}),
      lastName: new FormControl<string>("", { nonNullable: true}),
      email: new FormControl<string>("",{ nonNullable: true}),
      phoneNumber: new FormControl<string>("",{ nonNullable: true}),
  });
  
  ngOnInit(): void {
    this.usersService.getUserProfile()
      .subscribe(data => {
        if(!data) return this.router.navigateByUrl("/")
        this.profileForm.reset(data);
        this.loading = false;
        return;
      });
  }

  get currentProfile(): User {
    return this.profileForm.value as User
  }

  onSubmit(): void {
    if(!this.profileForm.valid) {
      return;
    }
    this.usersService.updateProfile(this.currentProfile)
      .pipe(          
        tap((success: boolean)=> {
            if(success) {
              this.messageService.add({ severity: 'success', 
              summary: this.translateService.instant('API.SUCCESS.DEFAULT'), 
              detail: this.translateService.instant('USERS.PROFILE.UPDATED'), life: 3000 })
            }
          })
        ).subscribe();
  } 

  onCancel(): void {
    this.router.navigateByUrl("")
  }
}
