import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, NonNullableFormBuilder } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PRIMENG_MODULES } from '../../../../../shared/primeng-modules';
import { AppService } from '../../../../../core/services/appService';
import { UiService } from '../../../../../core/services/UI/ui.service';

import { Customer } from '../../../../customer/models/customer-model';
import { Currency } from '../../../../currency/models/currency-model';
@Component({
  selector: 'app-account-add',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PRIMENG_MODULES
  ],
  templateUrl: './account-add.dialog.html',
  styleUrl: './account-add.dialog.css'
})
export class AccountAddDialog implements OnInit {
  accountForm: FormGroup;
  customers: Customer[] = [];
  currencies: Currency[] = [];

  savingTypes = [
    { label: 'Normal', value: 1 },
    { label: 'Plazo Fijo', value: 2 }
  ];

  accountTypes = [
    { label: 'Cuenta de Ahorros', value: 0 },
    { label: 'Cuenta Corriente', value: 1 }
  ];

  constructor(
    private fb: NonNullableFormBuilder,
    private dialogRef: DynamicDialogRef,
    private appService: AppService,
    private uiService: UiService
  ) {
    this.accountForm = this.fb.group({
      holder: ['', [Validators.required]],
      number: ['', [Validators.required]],
      type: [0, [Validators.required]],
      currencyId: [0, [Validators.min(1)]],
      customerId: [0, [Validators.min(1)]],

      // Subformularios opcionales según tipo
      savingType: [null], // usado cuando es ahorro
      operationalLimit: [null], // usados cuando es corriente
      monthAverage: [null],
      interest: [null]
    });
  }

  ngOnInit(): void {
    
    this.loadCustomers();
    this.loadCurrencies();
    
  }

  save(): void {
    if (this.accountForm.invalid) {
      this.markAllAsTouched();
      this.uiService.showWarn('Formulario inválido', 'Por favor complete los campos obligatorios');
      return;
    }

    const form = this.accountForm.value;
    const model = {
      holder: form.holder,
      number: form.number,
      type: form.type,
      currencyId: form.currencyId,
      customerId: form.customerId,
      createSavingAccount: {
        savingType: form.type === 0 ? form.savingType : 0
      },
      createCurrentAccount: {
        operationalLimit: form.type === 1 ? form.operationalLimit : 0,
        monthAverage: form.type === 1 ? form.monthAverage : 0,
        interest: form.type === 1 ? form.interest : 0
      }
    };

    this.appService.accountApiService.addAccount(model).subscribe({
      next: (response) => {
        this.uiService.showSuccess('Cuenta creada', 'La cuenta fue registrada exitosamente');
        this.dialogRef.close({ success: true, value: response });
      },
      error: (err) => {
        this.uiService.showError('Error', 'No se pudo guardar la cuenta: ' + (err.error?.message || ''));
        console.error(err);
      }
    });
  }

  private markAllAsTouched(): void {
    Object.values(this.accountForm.controls).forEach(control => {
      control.markAsTouched({ onlySelf: true });
    });
  }

  private loadCustomers(): void {
    this.appService.customerApiService.listCustomer().subscribe({
      next: (data: any) => this.customers = data,
      error: (err) => console.error('Error al cargar clientes', err)
    });
  }

  private loadCurrencies(): void {
    this.appService.currencyApiService.getCurrencyList().subscribe({
      next: (data: any) => this.currencies = data,
      error: (err) => console.error('Error al cargar monedas', err)
    });
  }
}
