import { Component } from '@angular/core';
import {InputText} from 'primeng/inputtext';
import {Button} from 'primeng/button';
import {FormsModule} from '@angular/forms';
// import { Customer} from '../../store/bank.api';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';

@Component({
  selector: 'app-customer-add',
  imports: [
    InputText,
    Button,
    FormsModule
  ],
  templateUrl: './bank-edit.dialog.html',
  styleUrl: './bank-edit.dialog.css'
})
export class BankEditDialog {

  // customer?: Customer;
  name?: string;
  document?: string;
  id?: number;


  constructor(private dialogRef : DynamicDialogRef<BankEditDialog>,
              private dialogConfig : DynamicDialogConfig) {

  const customerData = dialogConfig?.data?.customer;
  if (customerData) {
    this.assignValue(customerData);
  }

  }




  save(){
/*    let model : Customer = {
      id: this.id,
      name: this.name,
      document: this.document
    }

    this.dialogRef.close(model);*/
  }

  assignValue(value : any){
    this.id = value.id
    this.name = value.name;
    this.document = value.document;
  }

}
