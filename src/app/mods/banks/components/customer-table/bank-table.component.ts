import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TableModule} from "primeng/table";
import {ListEvent} from '../../../../shared/utils';
import {BankEntity} from '../../store/bank.api';

@Component({
  selector: 'app-bank-table',
  imports: [
    TableModule
  ],
  templateUrl: './bank-table.component.html',
  styleUrl: './bank-table.component.css'
})
export class BankTableComponent {

  _list: BankEntity[] = [];


  @Input() set list(list: any[]) {
    this._list = list;
  }

  @Output() action = new EventEmitter<ListEvent>();

  constructor() {
  }

  onRowClick(bank: any, event: any) {
    event.stopPropagation();
    this.action.emit(
      {
        type: "selected",
        value: bank
      }
    );
  }

  onEdit(bank: any, event: any) {
    event.stopPropagation();
    this.action.emit(
      {
        type: "edit",
        value: bank
      }
    );
  }


  onDelete(bank: any, event: any) {
    event.stopPropagation();
    this.action.emit(
      {
        type: "delete",
        value: bank
      }
    );
  }
}
