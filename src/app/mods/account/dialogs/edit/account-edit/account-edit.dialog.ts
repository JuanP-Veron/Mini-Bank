import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CommonModule } from '@angular/common';

import { AppService } from '../../../../../core/services/appService';
import { UiService } from '../../../../../core/services/UI/ui.service';
import { PRIMENG_MODULES } from '../../../../../shared/primeng-modules';

import { AccountPutRequest, AccountResponse } from '../../../models/account-model';
import { Currency } from '../../../../currency/models/currency-model';
import { Customer } from '../../../../customer/models/customer-model';

@Component({
  selector: 'app-account-edit',
  standalone: true,
  imports: [
    PRIMENG_MODULES,
    FormsModule,
    CommonModule
  ],
  templateUrl: './account-edit.dialog.html',
  styleUrl: './account-edit.dialog.css'
})
export class AccountEditDialog implements OnInit {
  model: AccountPutRequest = {
    id: 0,
    holder: '',
    number: '',
    balance: 0,
    status: 1,
    currencyId: 0,
    customerId: 0
  };

  currencies: Currency[] = [];
  customers: Customer[] = [];

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private appService: AppService,
    private ui: UiService
  ) {}

  ngOnInit(): void {
    this.loadCurrencies();
    this.loadCustomers();

    const account: AccountResponse | undefined = this.config.data?.account;
    if (account) {
      this.model = {
        id: account.id,
        holder: account.holder,
        number: account.number,
        balance: account.balance,
        status: account.status === 'ACTIVO' ? 1 : 0, // Ajusta si usas otro enum/string
        currencyId: account.currency,
        customerId: account.customer
      };
    }
  }

  save(): void {
    if (!this.model.id) {
      this.ui.showError('Error', 'No se encontró el ID de la cuenta.');
      return;
    }

    this.appService.accountApiService.updateAccount(this.model).subscribe({
      next: () => {
        this.ui.showSuccess('Cuenta actualizada', 'Se guardaron los cambios correctamente');
        this.ref.close({ success: true });
      },
      error: (err) => {
        this.ui.showError('Error', 'No se pudo actualizar la cuenta');
        console.error('Error al actualizar cuenta:', err);
      }
    });
  }

  private loadCurrencies(): void {
    this.appService.currencyApiService.getCurrencyList().subscribe({
      next: (data: Currency[]) => this.currencies = data,
      error: (err) => console.error('Error al cargar monedas', err)
    });
  }

  private loadCustomers(): void {
    this.appService.customerApiService.listCustomer().subscribe({
      next: (data: Customer[]) => this.customers = data,
      error: (err) => console.error('Error al cargar clientes', err)
    });
  }
}
