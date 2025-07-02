import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CommonModule } from '@angular/common';
import { Customer } from '../../../models/customer-model';
import { BankEntity } from '../../../../banks/models/banks-model';
import { AppService } from '../../../../../core/services/appService';
import { UiService } from '../../../../../core/services/UI/ui.service';
import { PRIMENG_MODULES } from '../../../../../shared/primeng-modules';

@Component({
  selector: 'app-customer-edit',
  standalone: true,
  imports: [
    PRIMENG_MODULES,
    FormsModule,
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
    private appService: AppService,
    private ui: UiService
  ) {}

  ngOnInit(): void {
    this.loadBanks();
    
  if (this.config.data?.customer) {
    this.model = { 
      ...this.config.data.customer,
      // Si el cliente tiene un objeto bank, extraemos el id
      bankId: this.config.data.customer.bank?.id || this.config.data.customer.bankId
    };
  }
  }

save(): void {
  this.appService.customerApiService.updateCustomer(this.model).subscribe({
    next: () => {
      this.ui.showSuccess('Cliente actualizado', 'Se guardaron correctamente');
      this.ref.close({ success: true });
    },
    error: (err) => {
      this.ui.showError('Error al guardar', 'No se pudo actualizar el cliente');
      console.error('Error al actualizar cliente', err);
    },
  });
}

  private loadBanks(): void {
    this.appService.bankApiService.listBanks().subscribe({
      next: (data: any) => this.banks = data,
      error: (err) => console.error('Error al cargar bancos', err)
    });
  }
}