import { Component, OnInit } from '@angular/core';
import {InputText} from 'primeng/inputtext';
import {Button} from 'primeng/button';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { Customer} from '../../../store/customer-api';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import { CustomerService } from '../../../services/customer-service';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BankService } from '../../../../banks/services/bank.service';
import { BankEntity } from '../../../../banks/store/bank.api';
import { DropdownModule } from 'primeng/dropdown';

import { CommonModule } from '@angular/common'; // si usás standalone

@Component({
  selector: 'app-customer-add',
  imports: [
    InputText,
    Button,
    FormsModule,DropdownModule,ReactiveFormsModule,CommonModule
  ],
  templateUrl: './customer-edit.dialog.html',
  styleUrl: './customer-edit.dialog.css'
})

export class CustomerEditDialog implements OnInit {
  customerForm: FormGroup;
  banks: BankEntity[] = [];
  customerId!: number;

  constructor(
    private fb: FormBuilder,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private customerService: CustomerService,
    private bankService: BankService,
    private messageService: MessageService
  ) {
    this.customerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      documentNumber: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      address: ['', Validators.required],
      mail: ['', Validators.email],
      phone: ['', Validators.required],
      customerStatus: [0],
      birth: ['', Validators.required],
      bankId: [0, Validators.min(1)]
    });
  }

  ngOnInit(): void {
    this.loadBanks();

    const customer: Customer = this.config.data?.customer;
    if (customer) {
      this.customerId = customer.id!;
      this.customerForm.patchValue(customer);
    }
  }

  save(): void {
    if (this.customerForm.invalid) {
      this.markAllAsTouched();
      this.messageService.add({
        severity: 'warn',
        summary: 'Formulario inválido',
        detail: 'Complete los campos obligatorios correctamente'
      });
      return;
    }

    const updatedCustomer = { ...this.customerForm.value, id: this.customerId };

    this.customerService.updateCustomer(updatedCustomer).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Actualizado',
          detail: 'Cliente actualizado correctamente'
        });
        this.ref.close({ success: true });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo actualizar el cliente: ' + (err.error?.message || 'Error desconocido')
        });
        console.error(err);
      }
    });
  }

  private markAllAsTouched(): void {
    Object.values(this.customerForm.controls).forEach(control => control.markAsTouched());
  }

  private loadBanks(): void {
    this.bankService.listBanks().subscribe({
      next: (data: any) => this.banks = data,
      error: (err) => console.error('Error al cargar bancos', err)
    });
  }
}