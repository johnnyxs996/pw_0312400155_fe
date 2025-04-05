import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private _defaultAccountCurrency = signal('EUR');
  public get defaultAccountCurrency(): string {
    return this._defaultAccountCurrency();
  }
  public set defaultAccountCurrency(currency: string) {
    this._defaultAccountCurrency.set(currency);
  }
}
