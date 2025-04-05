import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BankAccountDetailService {
  bankAccountRootVisible = signal(false);
}
