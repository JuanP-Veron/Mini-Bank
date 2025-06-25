// src/app/mods/account/components/account-table/account-table.component.ts

import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { Account } from '../../store/account-api';
import { TableModule } from 'primeng/table';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-account-table',
  standalone: true,
  imports: [    CommonModule,
    TableModule,
    ButtonModule,
    CurrencyPipe],
  templateUrl: './account-table.html',
  styleUrl: './account-table.css'
})
export class AccountTable implements OnChanges {

  _list: Account[] = [];

  @Input() set list(list: Account[]) {
    this._list = list;
  }

  @Output() action = new EventEmitter<{ type: string, value: Account }>();

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log("Account table changes:", changes);
  }

  onEdit(account: Account, event: Event) {
    event.stopPropagation();
    this.action.emit({ type: 'edit', value: account });
  }

  onDelete(account: Account, event: Event) {
    event.stopPropagation();
    this.action.emit({ type: 'delete', value: account });
  }

  trackById(index: number, item: Account): number {
  return item.id!;
}
}

