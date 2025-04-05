import { inject, Injectable } from '@angular/core';

import { JwtHelperService } from '@auth0/angular-jwt';
import { finalize, map, Observable, tap } from 'rxjs';

import { LoggedUserProfileService } from './logged-user-profile.service';
import { GlobalSpinnerService } from '../shared/services/global-spinner.service';
import { AuthApiService, LoginPost, Token } from '../../api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  protected authApiService = inject(AuthApiService);
  protected jwtHelperService = inject(JwtHelperService);
  protected loggedUserProfileService = inject(LoggedUserProfileService);
  protected globalSpinnerService = inject(GlobalSpinnerService);

  public login(userCredentials: LoginPost): Observable<Token> {
    this.globalSpinnerService.startSpinner();
    return this.authApiService.loginPost(userCredentials).pipe(
      tap((tokenData) => localStorage.setItem('access_token', tokenData.access_token)),
      tap((tokenData) => localStorage.setItem('refresh_token', tokenData.refresh_token)),
      tap(
        (tokenData) =>
          (this.loggedUserProfileService.loggedUserProfileId = this.jwtHelperService.decodeToken(
            tokenData.access_token
          )['sub'])
      ),
      finalize(() => this.globalSpinnerService.stopSpinner())
    );
  }

  public logout(): Observable<void> {
    this.globalSpinnerService.startSpinner();
    return this.authApiService.logoutPost().pipe(
      tap(() => this.loggedUserProfileService.clearUserProfileIdFromLocalStorage()),
      map(() => undefined),
      finalize(() => this.globalSpinnerService.stopSpinner())
    );
  }
}
