import { DatePipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';

import { MatCardModule } from '@angular/material/card';

import { BankNamePipe } from '../../../management/bank/bank-name.pipe';

@Component({
  selector: 'app-detail-card',
  imports: [MatCardModule, DatePipe, BankNamePipe],
  templateUrl: './detail-card.component.html',
  styleUrl: './detail-card.component.css'
})
export class DetailCardComponent {
  config = input.required<CardConfig>();

  cardTitle = computed(() => this.config().title);
  cardSubtitle = computed(() => this.config().subtitle);
  cardRows = computed(() => this.config().rows);
  protected readonly PipeName = PipeName;
}

export type PipeName =
  | 'date'
  | 'bankName'
  | 'insurancePolicyProductAmount'
  | 'insurancePolicyStatusName'
  | 'investmentStatusName'
  | 'loanStatusName';
export const PipeName = {
  Date: 'date' as PipeName,
  BankName: 'bankName' as PipeName,
  InsurancePolicyProductAmount: 'insurancePolicyProductAmount' as PipeName,
  InsurancePolicyStatusName: 'insurancePolicyStatusName' as PipeName,
  InvestmentStatusName: 'investmentStatusName' as PipeName,
  LoanStatusName: 'loanStatusName' as PipeName
};

export interface CardColumn {
  title: string;
  description: string | undefined;
  pipe?: PipeName;
}

export type CardRow = CardColumn[];

export interface CardConfig {
  title?: string;
  subtitle?: string;
  rows: CardRow[];
}
