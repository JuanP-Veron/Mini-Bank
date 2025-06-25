import { Component, OnInit } from '@angular/core';
import { Button } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TransferAddDialog } from '../../dialogs/transfer-add/transfer-add.dialog';
import { TransferService } from '../../services/transfer-service';
import { TransactionFilter } from '../../store/transfer-api';
import { MessageService } from 'primeng/api';
import { TransferTable } from '../../components/transfer-table/transfer-table';
import { ListEvent } from '../../../../shared/utils';


@Component({
  selector: 'app-transfer-page',
  imports: [Button, TransferTable],
  templateUrl: './transfer-page.html',
  styleUrl: './transfer-page.css'
})
export class TransferPage implements OnInit {

  transactionList: any[] = [];
  ref?: DynamicDialogRef;

  constructor(
    private transferService: TransferService,
    private dialogService: DialogService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  onStartAddTransfer(): void {
    this.ref = this.dialogService.open(TransferAddDialog, {
      header: 'Nueva Transferencia',
      width: '50vw',
      closable: true
    });

    this.ref.onClose.subscribe((result: any) => {
      if (result?.success) {
        this.loadTransactions();
      }
    });
  }

  onListAction(event: ListEvent): void {
    switch (event.type) {
      case 'view':
        this.messageService.add({
          severity: 'info',
          summary: 'Transacción',
          detail: `Monto: ${event.value.amount}`
        });
        break;

      case 'selected':
        this.messageService.add({
          severity: 'info',
          summary: 'Seleccionado',
          detail: `Item: ${event.value?.name || 'Sin nombre'}`
        });
        break;

      case 'delete':
        // Si en el futuro querés permitir eliminar transferencias, implementalo acá.
        this.messageService.add({
          severity: 'warn',
          summary: 'Eliminar',
          detail: 'Función eliminar no implementada'
        });
        break;
    }
  }

  loadTransactions(): void {
    const filter: TransactionFilter = {};
    this.transferService.getTransactionHistory(filter).subscribe({
      next: (data: any) => {
        this.transactionList = data;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error al cargar transacciones',
          detail: err.error?.message || 'Error desconocido'
        });
      }
    });
  }
}
