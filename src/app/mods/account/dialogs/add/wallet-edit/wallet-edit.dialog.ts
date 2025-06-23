import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Wallet } from '../../../store/wallet-api';
import {FormsModule} from '@angular/forms';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-wallet-edit.dialog',
  imports: [FormsModule,Button],
  templateUrl: './wallet-edit.dialog.html',
  styleUrl: './wallet-edit.dialog.css'
})
export class WalletEditDialog {

  id?: number;
  customerId?: number;
  money?: number;

  constructor(private dialogRef: DynamicDialogRef<WalletEditDialog>,
  private dialogConfig: DynamicDialogConfig) {
    const walletData = dialogConfig.data?.wallet;
    if (walletData) {
    this.assingValue(walletData);
    }
  }

  save() {
    let model: Wallet = {
      id: this.id,
      customerId: this.customerId,
      money: this.money
    }
    this.dialogRef.close(model);
  }

  assingValue(value: any){
    this.id = value.id;
    this.customerId = value.customerId;
    this.money = value.money;
  }

}
