import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, NonNullableFormBuilder } from '@angular/forms';
import {  DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Customer } from '../../../models/customer-model';
import { BankEntity } from '../../../../banks/models/banks-model';
import { AppService } from '../../../../../core/services/appService';
import { PRIMENG_MODULES } from '../../../../../shared/primeng-modules';
import { UiService } from '../../../../../core/services/UI/ui.service';

@Component({
  selector: 'app-customer-add',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PRIMENG_MODULES
  ],
  templateUrl: './customer-add.dialog.html',
  styleUrl: './customer-add.dialog.css'
})
export class CustomerAddDialog implements OnInit {
  banks: BankEntity[] = [];
  customerForm: FormGroup;

  constructor(
    private dialogRef: DynamicDialogRef,
    private appService: AppService,
    private fb: NonNullableFormBuilder,
    private uiService: UiService
  ) {
    this.customerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      documentNumber: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      address: ['', [Validators.required]],
      mail: ['', [Validators.email]],
      phone: ['', [Validators.required]],
      customerStatus: [0],
      birth: ['', [Validators.required]],
      bankId: [0, [Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    this.loadBanks();
  }

  save(): void {
    if (this.customerForm.invalid) {
      this.markAllAsTouched();
      this.uiService.showWarn('Formulario inválido', 'Por favor complete todos los campos requeridos correctamente');
      return;
    }

    const newCustomer: Customer = this.customerForm.value;

    this.appService.customerApiService.addCustomer(newCustomer).subscribe({
      next: () => {
        this.uiService.showSuccess('Éxito', 'Cliente guardado correctamente');
        this.dialogRef.close({ success: true, value: newCustomer });
      },
      error: (err) => {
        this.uiService.showError('Error', 'No se pudo guardar el cliente: ' + (err.error?.message || ''));
        console.error(err);
      }
    });
  }

  private markAllAsTouched(): void {
    Object.values(this.customerForm.controls).forEach(control => {
      control.markAsTouched({ onlySelf: true });
    });
  }

  private loadBanks(): void {
    this.appService.bankApiService.listBanks().subscribe({
      next: (data: any) => this.banks = data,
      error: (err) => console.error('Error al cargar bancos', err)
    });
  }
}
