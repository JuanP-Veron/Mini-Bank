import { Component, OnInit } from '@angular/core';
import { InputText } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CustomerService } from '../../../services/customer-service';
import { BankService } from '../../../../banks/services/bank.service';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { Customer } from '../../../store/customer-api';
import { BankEntity } from '../../../../banks/store/bank.api';

@Component({
  selector: 'app-customer-edit',
  standalone: true,
  imports: [
    InputText,
    Button,
    FormsModule,
    DropdownModule,
    CommonModule
  ],
  templateUrl: './customer-edit.dialog.html',
  styleUrl: './customer-edit.dialog.css'
})
export class CustomerEditDialog implements OnInit {
  model: Customer = {
    name: '',
    lastname: '',
    documentNumber: '',
    address: '',
    mail: '',
    phone: '',
    customerStatus: 0,
    birth: '',
    bankId: 0
  };
  banks: BankEntity[] = [];

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private customerService: CustomerService,
    private bankService: BankService
  ) {}

  ngOnInit(): void {
    this.loadBanks();
    
    if (this.config.data?.customer) {
      this.model = { ...this.config.data.customer, bankId: this.config.data.customer.bank.id };
    }
  }

  save(): void {
    this.customerService.updateCustomer(this.model).subscribe({
      next: () => this.ref.close({ success: true }),
      error: (err) => console.error('Error al actualizar cliente', err)
    });
  }

  private loadBanks(): void {
    this.bankService.listBanks().subscribe({
      next: (data: any) => this.banks = data,
      error: (err) => console.error('Error al cargar bancos', err)
    });
  }
}