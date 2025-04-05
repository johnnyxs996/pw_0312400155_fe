import { inject, Injectable } from '@angular/core';

import { finalize, map, Observable, tap } from 'rxjs';

import { GlobalSpinnerService } from '../shared/services/global-spinner.service';
import { LoggedUserProfileService } from '../auth/logged-user-profile.service';
import { UserProfileApiService, UserProfileGet, UserProfilesPost } from '../../api';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private globalSpinnerService = inject(GlobalSpinnerService);
  private loggedUserProfileService = inject(LoggedUserProfileService);
  private userProfileApiService = inject(UserProfileApiService);

  public getUserProfile(userProfileId: string): Observable<UserProfileGet> {
    return this.userProfileApiService.userProfilesIdGet(userProfileId);
  }

  createUserProfile(userProfileData: UserProfilesPost): Observable<string> {
    this.globalSpinnerService.startSpinner();
    return this.userProfileApiService.userProfilesPost(userProfileData).pipe(
      map((userProfileResponse) => userProfileResponse.id),
      tap((userProfileId) => (this.loggedUserProfileService.loggedUserProfileId = userProfileId)),
      finalize(() => this.globalSpinnerService.stopSpinner())
    );
  }
}
