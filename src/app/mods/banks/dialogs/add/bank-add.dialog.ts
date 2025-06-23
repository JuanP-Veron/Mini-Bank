import {Component} from '@angular/core';
import {InputText} from 'primeng/inputtext';
import {Button} from 'primeng/button';
import {FormsModule} from '@angular/forms';
import {BankEntity} from '../../store/bank.api';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {BankService} from '../../services/bank.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-customer-add',
  imports: [
    InputText,
    Button,
    FormsModule
  ],
  templateUrl: './bank-add.dialog.html',
  styleUrl: './bank-add.dialog.css'
})
export class BankAddDialog {

  // customer?: Customer;
  name?: string;
  document?: string;
  id?: number;

  model : BankEntity ={
    name: "",
    phone: "",
    mail: "",
    address: "",
  }


  constructor(private dialogRef: DynamicDialogRef<BankAddDialog>,
              private dialogConfig: DynamicDialogConfig,
              private bankService: BankService,
            private messageService: MessageService,
         ) {

  }




save() {

  this.bankService.addBank(this.model).subscribe({
    next: () => {
      this.dialogRef.close({ success: true, value: this.model });
    },
    error: err => {
      const backendMessage = err?.error?.Message;
      if (backendMessage?.includes('ya en uso')) {
        this.messageService.add({
          severity: 'error',
          summary: 'Duplicado',
          detail: 'Ya existe un banco con ese nombre.'
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error del servidor',
          detail: 'No se pudo guardar el banco.'
        });
      }
    }
  });
}




  assignValue(value: any) {
    this.id = value.id
    this.name = value.name;
    this.document = value.document;
  }

}




