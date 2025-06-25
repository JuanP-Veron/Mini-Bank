

import { Component, ChangeDetectionStrategy, OnInit} from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { AccountService } from '../../services/account-service';
import { Account } from '../../store/account-api';
import { AccountTable } from '../../components/account-table/account-table';

import { AccountEditDialog } from '../../dialogs/add/account-edit/account-edit.dialog';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-account-page',
  imports: [
    ButtonModule,
    AsyncPipe,AccountTable, CommonModule
  ],
  templateUrl: './account-page.html',
  styleUrl: './account-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
}) 
export class AccountPage implements OnInit {

  accountList$!: Observable<Account[]>;

  constructor(
    private accountService: AccountService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.loadAccounts();
  }


  loadAccounts() {
    this.accountList$ = this.accountService.getAll();
  }

  onStartAddAction(event: Event) {
    event.stopPropagation();
    const ref = this.dialogService.open(AccountEditDialog, {
      header: 'Nueva cuenta',
      width: '400px'
    });

    ref.onClose.subscribe(result => {
      if (result) {
        this.accountService.create(result).subscribe(() => this.loadAccounts());
      }
    });
  }

  onListAction(event: { type: string; value: Account }) {
    if (event.type === 'edit') {
      const ref = this.dialogService.open(AccountEditDialog, {
        header: 'Editar cuenta',
        width: '400px',
        data: { account: event.value }
      });

      ref.onClose.subscribe(result => {
        if (result) {
          this.accountService.update(result).subscribe(() => this.loadAccounts());
        }
      });

    } else if (event.type === 'delete') {
      if (confirm('¿Seguro que deseas eliminar esta cuenta?')) {
        this.accountService.delete(event.value.id!).subscribe(() => this.loadAccounts());
      }
    }
  }
}
