import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService } from 'primeng/api';

import { Customer } from '../../models/customer-model';
import { AppService } from '../../../../core/services/appService';
import { CustomerAddDialog } from '../../dialogs/add/customer-add/customer-add.dialog';
import { CustomerEditDialog } from '../../dialogs/edit/customer-edit/customer-edit.dialog';
import { AsyncPipe, CommonModule } from '@angular/common';
import { CustomerTable } from '../../components/customer-table/customer-table';
import { UiService } from '../../../../core/services/UI/ui.service';
import { PRIMENG_MODULES } from '../../../../shared/primeng-modules';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-customer-page',
    imports: [AsyncPipe,PRIMENG_MODULES, CustomerTable, CommonModule,ProgressSpinnerModule],
  templateUrl: './customer-page.html',
  styleUrl: './customer-page.css',
})
export class CustomerPage implements OnInit, OnDestroy {
  customers$ = new BehaviorSubject<Customer[]>([]);
  loading$: Observable<boolean>;

  private destroy$ = new Subject<void>();
  private ref: DynamicDialogRef | null = null;
  
  constructor(
    private appService: AppService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private uiService: UiService
  ) {
    
  this.loading$ = this.uiService.loading$;
  }
  

  ngOnInit(): void {
    this.loadCustomers();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.ref?.close();
  }

  private loadCustomers(): void {
    this.uiService.setLoading(true);
    this.appService.customerApiService.listCustomer()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (customers) => this.customers$.next(customers),
        error: (err) => {
          this.uiService.showError('Error al cargar clientes', err.error?.message || 'No se pudo obtener la lista');
        },
        complete: () => this.uiService.setLoading(false),
      });
  }

  onStartAddAction(): void {
    this.ref = this.dialogService.open(CustomerAddDialog, {
      header: 'Agregar Cliente',
      closable: true,
      height: '80dvh',
      width: '70dvh',
    });

    this.ref.onClose.pipe(takeUntil(this.destroy$)).subscribe((result) => {
      if (result?.success) this.loadCustomers();
      this.ref = null;
    });
  }

  onEdit(customer: Customer): void {
    this.ref = this.dialogService.open(CustomerEditDialog, {
      data: { customer },
      header: 'Editar Cliente',
      closable: true,
      height: '90dvh',
      width: '70dvh',
    });

    this.ref.onClose.pipe(takeUntil(this.destroy$)).subscribe((result) => {
      if (result?.success) this.loadCustomers();
      this.ref = null;
    });
  }

  onDelete(customer: Customer): void {
    if (!customer?.id) return;

    this.confirmationService.confirm({
      message: `¿Estás seguro de que querés eliminar al cliente <b>${customer.name}</b>? Esta acción no se puede deshacer.`,
      header: 'Eliminar cliente',
      icon: 'pi pi-trash',
      acceptLabel: 'Eliminar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger custom-confirm-btn',
      rejectButtonStyleClass: 'p-button-secondary custom-cancel-btn',
      accept: () => {
        this.uiService.setLoading(true);
        this.appService.customerApiService.deleteCustomer(customer.id as number)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: () => {
              this.uiService.showSuccess('Eliminado', `${customer.name} fue eliminado correctamente.`);
              this.loadCustomers();
            },
            error: (err) =>
              this.uiService.showError('Error al eliminar', err.error?.message || 'No se pudo eliminar el cliente'),
            complete: () => this.uiService.setLoading(false),
          });
      },
    });
  }
  onListAction(event: { type: string; value: Customer }): void {
    switch (event.type) {
      case 'edit':
        this.onEdit(event.value);
        break;
      case 'delete':
        this.onDelete(event.value);
        break;
      default:
        console.warn('Acción no reconocida:', event.type);
    }
  }
}