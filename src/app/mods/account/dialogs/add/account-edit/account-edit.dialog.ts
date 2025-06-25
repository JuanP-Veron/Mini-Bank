

import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Account } from '../../../store/account-api';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-account-edit-dialog',
  standalone: true,
  imports: [FormsModule, Button, InputTextModule],
  templateUrl: './account-edit.dialog.html',
  styleUrl: './account-edit.dialog.css'
})
export class AccountEditDialog {
id?: number;
  holder: string = '';
  number: string = '';
  type: number = 0;
  currencyId: number = 0;
  customerId: number = 0;

  constructor(
    private dialogRef: DynamicDialogRef<AccountEditDialog>,
    private dialogConfig: DynamicDialogConfig
  ) {
    const account = dialogConfig.data?.account;
    if (account) this.assignValue(account);
  }

  save() {
    const model: Account = {
      id: this.id,
      holder: this.holder,
      number: this.number,
      type: this.type,
      currencyId: this.currencyId,
      customerId: this.customerId
    };
    this.dialogRef.close(model);
  }

  assignValue(account: Account) {
    this.id = account.id;
    this.holder = account.holder;
    this.number = account.number;
    this.type = account.type;
    this.currencyId = account.currencyId;
    this.customerId = account.customerId;
  }
}