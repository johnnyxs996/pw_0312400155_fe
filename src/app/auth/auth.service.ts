import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';
import { finalize, Observable, tap } from 'rxjs';

import { LoggedUserProfileService } from './logged-user-profile.service';
import { GlobalSpinnerService } from '../shared/services/global-spinner.service';
import { AuthApiService, LoginPost, Token } from '../../api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  protected router = inject(Router);
  protected authApiService = inject(AuthApiService);
  protected jwtHelperService = inject(JwtHelperService);
  protected loggedUserProfileService = inject(LoggedUserProfileService);
  protected globalSpinnerService = inject(GlobalSpinnerService);

  private tokenData: TokenData | undefined;
  private tokenRefreshInterval: NodeJS.Timeout | undefined;

  public login(userCredentials: LoginPost): Observable<Token> {
    this.globalSpinnerService.startSpinner();
    return this.authApiService.loginPost(userCredentials).pipe(
      tap((tokenData) => this.setTokens(tokenData)),
      tap(() => this.startRefreshInterval()),
      finalize(() => this.globalSpinnerService.stopSpinner())
    );
  }

  private refreshToken(): Observable<Token> {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      this.clearRefreshInterval();
      this.router.navigate(['/auth', 'login']);
    }
    return this.authApiService.refreshPost(refreshToken!).pipe(tap((tokenData) => this.setTokens(tokenData)));
  }

  private startRefreshInterval() {
    if (!this.tokenData) {
      return;
    }
    this.clearRefreshInterval();

    const duration = this.tokenData!.dur;
    this.tokenRefreshInterval = setInterval(() => this.refreshToken().subscribe(), duration);
  }

  private clearRefreshInterval() {
    if (this.tokenRefreshInterval) {
      clearInterval(this.tokenRefreshInterval);
    }
  }

  public logout() {
    this.globalSpinnerService.startSpinner();
    return this.authApiService.logoutPost().pipe(
      tap(() => this.loggedUserProfileService.clearUserProfileIdFromLocalStorage()),
      tap(() => this.clearRefreshInterval()),
      finalize(() => this.globalSpinnerService.stopSpinner())
    );
  }

  private setTokens(tokenData: Token): void {
    localStorage.setItem('access_token', tokenData.access_token);
    localStorage.setItem('refresh_token', tokenData.refresh_token);
    this.tokenData = this.jwtHelperService.decodeToken(tokenData.access_token) as TokenData;
    this.loggedUserProfileService.loggedUserProfileId = this.tokenData.sub;
  }
}

interface TokenData {
  sub: string;
  exp: number;
  iat: number;
  dur: number;
}
