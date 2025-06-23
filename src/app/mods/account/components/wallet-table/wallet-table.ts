import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Button } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Wallet } from '../../store/wallet-api';

@Component({
  selector: 'app-wallet-table',
  imports: [TableModule, Button],
  templateUrl: './wallet-table.html',
  styleUrl: './wallet-table.css'
})
export class WalletTable implements OnChanges{

  _list: Wallet[] = [];

  @Input() set list(list: Wallet[]) {
    this._list = list;
  }

  @Output() action = new EventEmitter<{ type: string, value: Wallet }>();

  constructor() {}

  
  ngOnChanges(changes: SimpleChanges): void {
    console.log("me cambie", changes);
  }



  onEdit(wallet: Wallet, event: Event) {
    event.stopPropagation();
    this.action.emit({
      type: "edit",
      value: wallet
    });
  };

  onDelete(wallet: Wallet, event: Event) {
    event.stopPropagation();
    this.action.emit({
      type: "delete",
      value: wallet
    });
  } 

}
