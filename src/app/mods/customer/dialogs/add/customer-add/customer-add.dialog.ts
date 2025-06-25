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
  templateUrl: './customer-add.dialog.html',
  styleUrl: './customer-add.dialog.css'
})
export class CustomerAddDialog implements OnInit{

  banks: BankEntity[] = [];

model : Customer = {
  name: '',
  lastname: '',
  documentNumber:'',
  address:'',
  mail:'',
  phone:'',
  customerStatus: 0,
  birth: '',
  bankId: 0,
}

 customerForm: FormGroup;

constructor(private dialogRef: DynamicDialogRef<CustomerAddDialog>,
            private dialogConfig: DynamicDialogConfig,
          private custormerService: CustomerService,
          private bankService: BankService,
          private messageService: MessageService,
          private fb: FormBuilder) {


 this.customerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      documentNumber: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      address: ['',[Validators.required]],
      mail: ['', [Validators.email]],
      phone: ['', [Validators.required]],
      customerStatus: [0],
      birth: ['',[Validators.required]],
      bankId: [0, [Validators.min(0)]]
    });

}


  ngOnInit() {
    this.loadBanks();
  }

  save() {
    if (this.customerForm.invalid) {
      this.markAllAsTouched();
      this.messageService.add({
        severity: 'warn',
        summary: 'Formulario inválido',
        detail: 'Por favor complete todos los campos requeridos correctamente'
      });
      return;
    }

    this.custormerService.addCustomer(this.customerForm.value).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Cliente guardado correctamente'
        });
        this.dialogRef.close({ success: true, value: this.customerForm.value });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo guardar el cliente: ' + (err.error?.message || '')
        });
        console.error(err);
      },
    });
  }


    private markAllAsTouched() {
    Object.values(this.customerForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }



    loadBanks() {
    this.bankService.listBanks().subscribe({
      next: (data: any) => {
        this.banks = data;
      },
      error: (err) => {
        console.error('Error cargando bancos', err);
      }
    });

}

}
