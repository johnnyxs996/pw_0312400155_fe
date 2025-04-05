import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { catchError, EMPTY, tap } from 'rxjs';

import { AuthService } from '../auth.service';
import { ErrorModelType } from '../../shared/models/error.model';
import { NotificationService } from '../../shared/services/notification.service';
import { LoginPost, ModelError } from '../../../api';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    ReactiveFormsModule,
    RouterLink,
    PageHeaderComponent
  ]
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private notificationService = inject(NotificationService);
  private authService = inject(AuthService);

  protected hidePassword = true;

  loginForm = this.fb.group({
    email: [null, Validators.required],
    password: [null, Validators.required]
  });

  login(): void {
    if (this.loginForm.invalid) {
      this.notificationService.create('Controllare i dati inseriti e riprovare.', 'error');
      return;
    }
    this.authService
      .login(this.loginForm.getRawValue() as unknown as LoginPost)
      .pipe(
        catchError((err, caught) => {
          let errorMessage = 'Impossibile effettuare il login. Riprovare.';
          if ((err.error as ModelError).type === ErrorModelType.InvalidCredentialsError) {
            errorMessage = 'Sono state inserite delle credenziali errate. Riprovare.';
          }
          this.notificationService.create(errorMessage, 'error');
          return EMPTY;
        }),
        tap(() => this.router.navigate(['/bank-account']))
      )
      .subscribe();
  }
}
