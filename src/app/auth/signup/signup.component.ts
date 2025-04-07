import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { MatButton, MatIconButton } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatHint, MatInput, MatLabel, MatSuffix } from '@angular/material/input';
import { tap } from 'rxjs';

import { NotificationService } from '../../shared/services/notification.service';
import { UserProfileService } from '../../user-profile/user-profile.service';
import { UserProfilesPost } from '../../../api';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { SidenavService } from '../../shared/services/sidenav.service';

@Component({
  selector: 'app-signup',
  imports: [
    MatButton,
    MatDatepickerModule,
    MatFormField,
    MatHint,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    MatSuffix,
    ReactiveFormsModule,
    RouterLink,
    PageHeaderComponent
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private notificationService = inject(NotificationService);
  private userProfileService = inject(UserProfileService);
  private sidenavService = inject(SidenavService);

  protected hidePassword = true;

  signupForm = this.fb.group({
    name: [null, Validators.required],
    surname: [null, Validators.required],
    email: [null, Validators.required],
    password: [null, Validators.required],
    taxIdentificationNumber: [null, [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
    birthDate: [null],
    birthCountry: [null, [Validators.minLength(3), Validators.maxLength(3)]],
    birthState: [null, [Validators.minLength(2), Validators.maxLength(2)]],
    birthCity: [null]
  });

  ngOnInit() {
    this.sidenavService.setNavlistConfig([]);
  }

  signup(): void {
    if (this.signupForm.invalid) {
      this.notificationService.create('Controllare i dati inseriti e riprovare.', 'error');
      return;
    }
    this.userProfileService
      .createUserProfile(this.signupForm.getRawValue() as unknown as UserProfilesPost)
      .pipe(
        tap((_) => {
          this.notificationService.create('Profilo creato correttamente', 'success');
          this.router.navigate(['/auth', 'login']);
        })
      )
      .subscribe();
  }
}
