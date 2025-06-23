import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CustomerTableComponent } from '../../components/customer-table/customer-table.component';
import { CustomerService } from '../../services/customer-service';
import { Button } from 'primeng/button';
import { DialogService, DynamicDialogRef, DynamicDialogModule } from 'primeng/dynamicdialog';
import { CustomerEditDialog } from '../../dialogs/add/customer-edit/customer-edit.dialog';
import { Customer } from '../../store/customer-api';
import { MessageService } from 'primeng/api';
import { ListEvent } from '../../../../shared/utils';
import { ConfirmationService } from 'primeng/api';


/*
  CICLO DE VIDA (lifecycle):
  - constructor: se ejecuta al crear la clase
  - ngOnInit: se ejecuta una vez que el componente fue construido y renderizado
  - ngOnChanges: reacciona a cambios en @Input
  - ngAfterViewInit: cuando las vistas hijas ya están renderizadas
  - ngOnDestroy: cuando el componente se elimina
*/

@Component({
  selector: 'app-customer-page',
  imports: [ TableModule, CustomerTableComponent, Button, DynamicDialogModule ],
  standalone: true,
  templateUrl: './customer-page.html',
  styleUrl: './customer-page.css',
  providers: [DialogService],
})
export class CustomerPage implements OnInit {

  // ::: vars
  //
  customerList: Customer[] = [];

  ref: DynamicDialogRef | undefined;

  // ::: constructor
  //

  constructor(private customerService: CustomerService,
              private dialogService: DialogService,
              private messageService: MessageService,
             private confirmationService: ConfirmationService,) {

  }


  // ::: lifecycle
  //

  ngOnInit() {
  this.loadEntitis()
  }

  // ::: ui listener
  //

  onStartAddAction(event?: any) {
    const data = {
      header: 'Agregar Cliente',
      closable: true,
      height: '100dvh',
      width: '70dvh',
    }
    this.ref = this.dialogService.open(CustomerEditDialog, data);
    this.ref.onClose.subscribe((result: any) => {
    if (result?.success) {
    this.loadEntitis(); // recarga la lista
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
       // this.onEdit(event.value)
        break;
      case 'delete':
        this.onDelete(event.value)
        break
      default:
        break;
    }

  }

/*
  onEdit(value?: Customer) {
    const data = {
      data: {
        customer: value,
      },
      header: 'Editar Cliente',
      closable: true,
      height: '50dvh',
      width: '50dvh',
    }
    this.dialogService.open(CustomerEditDialog, data)
      .onClose
      .subscribe((result: any) => {
        const newCustomerList = this.customerService.getCustomerList;
        const newCustomer =  newCustomerList.find((customer) => customer.id === result.id);
        if (newCustomer) {
          newCustomer.id = result.id;
          newCustomer.name = result.name;
          newCustomer.document = result.document;
        }
      })
  }
      */
/*
onDelete(customer: Customer) {
  if (!customer) return;

  const idx = this.customerList.findIndex(c => c.id === customer.id);
  if (idx > -1) {
    this.customerList.splice(idx, 1);
    this.messageService.add({
      severity: 'warn',
      summary: 'Cliente eliminado',
      detail: customer.name
    });
  }

}*/

onDelete(customer: Customer) {
  if (!customer || !customer.id) return;

  this.confirmationService.confirm({
    message: `¿Estás seguro de que querés eliminar a ${customer.name}?`,
    header: 'Confirmar eliminación',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: 'Sí',
    rejectLabel: 'No',
    accept: () => {
      this.customerService.deleteCustomer(customer.id!).subscribe({
        next: () => {
          this.customerList = this.customerList.filter(c => c.id !== customer.id);
          this.messageService.add({
            severity: 'success',
            summary: 'Eliminado',
            detail: `${customer.name} fue eliminado correctamente.`
          });
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error al eliminar',
            detail: err.error?.message || 'No se pudo eliminar el cliente'
          });
          console.error('Error al eliminar cliente:', err);
        }
      });
    }
  });
}



  loadEntitis() {
    this.customerService.listCustomer().subscribe({
      next: data => {
        this.customerList = <Customer[]>data;
      }
    })
  }
}