import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalSpinnerService {
  public spinning = signal(false);

  public startSpinner(): void {
    this._setSpinningValue(true);
  }

  public stopSpinner(): void {
    this._setSpinningValue(false);
  }

  private _setSpinningValue(value: boolean): void {
    this.spinning.set(value);
  }
}
