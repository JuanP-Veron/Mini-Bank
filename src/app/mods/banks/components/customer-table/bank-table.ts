import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { BankEntity } from '../../models/banks-model';
import { ListEvent } from '../../../../shared/utils';
import { FallbackPipe } from '../../../../shared/pipes/fallback.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bank-table',
  standalone: true,
  imports: [TableModule, ButtonModule, FallbackPipe, CommonModule],
  templateUrl: './bank-table.html',
  styleUrl: './bank-table.css'
})

export class BankTable {
  _list: BankEntity[] = [];

  @Input() set list(list: BankEntity[]) {
    this._list = list;
  }

  @Output() action = new EventEmitter<ListEvent>();

  constructor() {}


  onRowClick(bank: BankEntity, event: Event): void {
    event.stopPropagation();
    this.action.emit({
      type: 'selected',
      value: bank
    });
  }


  onEdit(bank: BankEntity, event: Event): void {
    event.stopPropagation();
    this.action.emit({
      type: 'edit',
      value: bank
    });
  }


  onDelete(bank: BankEntity, event: Event): void {
    event.stopPropagation();
    this.action.emit({
      type: 'delete',
      value: bank
    });
  }
}
