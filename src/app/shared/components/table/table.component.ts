import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

import { TableColumns, TableRows } from './table.model';

@Component({
  selector: 'app-table',
  imports: [MatTableModule, RouterLink, MatButtonModule, MatIconModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  title = input<string | undefined>(undefined);
  newItemRoute = input<string | undefined>(undefined);
  columnConfig = input.required<TableColumns>();
  rowsData = input.required<TableRows>();
  emptyDataTitle = input<string>('Non ci sono dati');
  emptyDataDescription = input<string>("Per cominciare, utilizza l'apposito pulsante");

  columnNames = computed(() => this.columnConfig()?.map((col) => col.name) || []);
}
