import {Component, OnInit} from '@angular/core';
import {TableModule} from 'primeng/table';
import {BankTableComponent} from '../../components/customer-table/bank-table.component';
import {Button} from 'primeng/button';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {BankEditDialog} from '../../dialogs/edit/bank-edit.dialog';
import {ListEvent} from '../../../../shared/utils';
import {MessageService} from 'primeng/api';
import {BankAddDialog} from '../../dialogs/add/bank-add.dialog';
import {BankService} from '../../services/bank.service';
import {BankEntity} from '../../store/bank.api';


@Component({
  selector: 'app-bank-page',
  imports: [
    TableModule,
    BankTableComponent,
    Button
  ],
  templateUrl: './bank-page.html',
  styleUrl: './bank-page.css',
})
export class BankPage implements OnInit {

  // ::: vars
  //
  bankList: BankEntity[] = [];

  ref: DynamicDialogRef | undefined;

  // ::: constructor
  //

  constructor(private dialogService: DialogService,
              private messageService: MessageService,
              private bankService: BankService,) {

  }


  // ::: lifecycle
  //

  ngOnInit() {
    this.loadEntities();

  }

  // ::: ui listener
  //

  onStartAddAction(event?: any) {
    const data = {
      header: 'Agregar Banco',
      closable: true,
      height: '70dvh',
      width: '50dvh',
    }
    this.ref = this.dialogService.open(BankAddDialog, data);
this.ref.onClose.subscribe((result: any) => {
  if (result?.success && result.value) {
    this.bankList.push(result.value);
    this.messageService.add({ severity: 'success', summary: 'Banco agregado correctamente' });
  }
});

  }

  onListAction(event: ListEvent) {
    switch (event.type) {
      case 'selected':
        this.messageService.add(
          {summary: `El objeto seleccionado \ ${event.value.name}`}
        )
        break;
      case 'edit':
        this.onEdit(event.value)
        break;
      case 'delete':
        break
      default:
        break;
    }

  }


  onEdit(value?: any) {
    const data = {
      data: {
        customer: value,
      },
      header: 'Editar Cliente',
      closable: true,
      height: '70dvh',
      width: '50dvh',
    }
    this.dialogService.open(BankEditDialog, data)
      .onClose
      .subscribe((result: any) => {
        // const newCustomerList = this.customerService.getCustomerList;
        /*        const newCustomer = newCustomerList.find((customer) => customer.id === result.id);
                if (newCustomer) {
                  newCustomer.id = result.id;
                  newCustomer.name = result.name;
                  newCustomer.document = result.document;
                }*/
      })
  }

  loadEntities() {
    this.bankService.listBanks().subscribe(
      {
        next: data => { this.bankList = <BankEntity[]>data
        }
      }
    )
  }

}
