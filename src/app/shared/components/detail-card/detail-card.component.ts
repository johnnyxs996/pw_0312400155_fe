import { Component, computed, input } from '@angular/core';

import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-detail-card',
  imports: [MatCardModule],
  templateUrl: './detail-card.component.html',
  styleUrl: './detail-card.component.css'
})
export class DetailCardComponent {
  config = input.required<CardConfig>();

  cardTitle = computed(() => this.config().title);
  cardSubtitle = computed(() => this.config().subtitle);
  cardRows = computed(() => this.config().rows);
}

export type PipeName = 'currency';
export const PipeName = {
  Currency: 'currency' as PipeName,
};

export interface CardColumn {
  title: string;
  description: string;
  pipe?: PipeName;
}

export type CardRow = CardColumn[];

export interface CardConfig {
  title?: string;
  subtitle?: string;
  rows: CardRow[];
}
