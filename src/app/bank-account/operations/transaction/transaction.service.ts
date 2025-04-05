import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ResourcePostResponse, TransactionApiService, TransactionGet, TransactionsPost } from '../../../../api';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private transactionApiService = inject(TransactionApiService);

  public getBankAccountTransactions(bankAccountId: string): Observable<TransactionGet[]> {
    return this.transactionApiService.transactionsGet(undefined, undefined, bankAccountId);
  }

  getTransaction(transactionId: string): Observable<TransactionGet> {
    return this.transactionApiService.transactionsIdGet(transactionId);
  }

  public createTransaction(transactionData: TransactionsPost): Observable<ResourcePostResponse> {
    return this.transactionApiService.transactionsPost(transactionData);
  }
}
