import { Component, OnInit,NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CustomerTableComponent } from '../../components/customer-table/customer-table.component';
import { Button } from 'primeng/button';
import { DialogService, DynamicDialogRef, DynamicDialogModule } from 'primeng/dynamicdialog';
import { CustomerAddDialog } from '../../dialogs/add/customer-add/customer-add.dialog';
import { CustomerEditDialog } from '../../dialogs/edit/customer-edit/customer-edit.dialog';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { CustomerFacade } from '../../facade/customer.facade';
import { AsyncPipe } from '@angular/common';
import { Customer } from '../../store/customer-api';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { ListEvent } from '../../../../shared/utils'

@Component({
  selector: 'app-customer-page',
  standalone: true,
  imports: [TableModule, CustomerTableComponent, Button, DynamicDialogModule, AsyncPipe , CommonModule,ProgressSpinnerModule],
  templateUrl: './customer-page.html',
  styleUrl: './customer-page.css',
  providers: [DialogService],
})
export class CustomerPage implements OnInit {

  // Propiedades primero (importante el orden)
  
  ref: DynamicDialogRef | undefined;
  customers$!: Observable<Customer[]>;
  loading$!: Observable<boolean>;

  constructor(
    private customerFacade: CustomerFacade,
    private dialogService: DialogService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
        this.customers$ = this.customerFacade.customers$;
    this.loading$ = this.customerFacade.loading$;
  }

  ngOnInit() {
    this.loadEntities();
  }

  
onListAction(event: ListEvent) {
  switch (event.type) {
    case 'selected':
      this.messageService.add({
        severity: 'info',
        summary: 'Cliente seleccionado',
        detail: `Seleccionaste: ${event.value.name}`
      });
      break;
    case 'edit':
      this.onEdit(event.value);
      break;
    case 'delete':
      this.onDelete(event.value);
      break;
    default:
      console.warn('Tipo de acción no reconocido:', event.type);
      break;
  }
}
  // ... (resto de métodos se mantienen igual)
  onStartAddAction(event?: any) {
    const data = {
      header: 'Agregar Cliente',
      closable: true,
      height: '100dvh',
      width: '70dvh',
    };
    this.ref = this.dialogService.open(CustomerAddDialog, data);
    this.ref.onClose.subscribe((result: any) => {
      if (result?.success) {
        this.loadEntities();
      }
    });
  }


  onEdit(customer: Customer): void {
    this.ref = this.dialogService.open(CustomerEditDialog, {
      data: { customer },
      header: 'Editar Cliente',
      closable: true,
      width: '50vw',
    });
    this.ref.onClose.subscribe((result: any) => {
      if (result?.success) {
        this.loadEntities();
      }
    });
  }

  onDelete(customer: Customer) {
    if (!customer?.id) return;

    this.confirmationService.confirm({
      message: `¿Estás seguro de que querés eliminar a ${customer.name}?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      accept: () => {
        this.customerFacade.delete(customer.id!).subscribe({
          next: () => {
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
          }
        });
      }
    });
  }

  loadEntities() {
    this.customerFacade.load();
  }
}