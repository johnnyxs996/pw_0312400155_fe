import { Injectable } from '@angular/core';

export const LOGGED_USER_PROFILE_ID_KEY = 'LOGGED_USER_PROFILE_ID';

@Injectable({
  providedIn: 'root'
})
export class LoggedUserProfileService {
  public get loggedUserProfileId(): string | null {
    return this.getUserProfileIdFromLocalStorage();
  }

  public set loggedUserProfileId(id: string) {
    this.addUserProfileIdToLocalStorage(id);
  }

  private addUserProfileIdToLocalStorage(id: string): void {
    localStorage.setItem(LOGGED_USER_PROFILE_ID_KEY, id);
  }

  private getUserProfileIdFromLocalStorage(): string | null {
    return localStorage.getItem(LOGGED_USER_PROFILE_ID_KEY);
  }

  public clearUserProfileIdFromLocalStorage(): void {
    localStorage.removeItem(LOGGED_USER_PROFILE_ID_KEY);
  }
}
