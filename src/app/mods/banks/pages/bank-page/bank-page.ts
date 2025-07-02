import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService } from 'primeng/api';
import { AsyncPipe, CommonModule } from '@angular/common';

import { BankTable } from '../../components/customer-table/bank-table';
import { BankAddDialog } from '../../dialogs/add/bank-add.dialog';
import { BankEditDialog } from '../../dialogs/edit/bank-edit.dialog';

import { AppService } from '../../../../core/services/appService';
import { UiService } from '../../../../core/services/UI/ui.service';

import { BankEntity } from '../../models/banks-model';
import { PRIMENG_MODULES } from '../../../../shared/primeng-modules';
import { ListEvent } from '../../../../shared/utils';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-bank-page',
  imports: [ BankTable, AsyncPipe, PRIMENG_MODULES, CommonModule, ProgressSpinnerModule],
  templateUrl: './bank-page.html',
  styleUrl: './bank-page.css',
})
export class BankPage implements OnInit, OnDestroy {
  banks$ = new BehaviorSubject<BankEntity[]>([]);
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
    this.loadBanks();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.ref?.close();
  }

  private loadBanks(): void {
    this.uiService.setLoading(true);
    this.appService.bankApiService.listBanks()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (banks) => this.banks$.next(banks),
        error: (err) => {
          this.uiService.showError('Error al cargar bancos', err.error?.message || 'No se pudo obtener la lista');
        },
        complete: () => this.uiService.setLoading(false),
      });
  }

  onStartAddAction(): void {
    this.ref = this.dialogService.open(BankAddDialog, {
      header: 'Agregar Banco',
      closable: true,
      height: '50dvh',
      width: '50dvh',
    });

    this.ref.onClose.pipe(takeUntil(this.destroy$)).subscribe((result) => {
      if (result?.success && result.value) {
        this.loadBanks();
      }
      this.ref = null;
    });
  }

  onEdit(bank: BankEntity): void {
    this.ref = this.dialogService.open(BankEditDialog, {
      data: { bank },
      header: 'Editar Banco',
      closable: true,
      height: '60dvh',
      width: '50dvh',
    });

    this.ref.onClose.pipe(takeUntil(this.destroy$)).subscribe((result) => {
      if (result?.success) {
        this.loadBanks();
      }
      this.ref = null;
    });
  }

  onDelete(bank: BankEntity): void {
    if (!bank?.id) return;

    this.confirmationService.confirm({
      message: `¿Estás seguro de que querés eliminar el banco <b>${bank.name}</b>? Esta acción no se puede deshacer.`,
      header: 'Eliminar Banco',
      icon: 'pi pi-trash',
      acceptLabel: 'Eliminar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger custom-confirm-btn',
      rejectButtonStyleClass: 'p-button-secondary custom-cancel-btn',
      accept: () => {
        this.uiService.setLoading(true);
        this.appService.bankApiService.deleteBank(bank.id as number)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: () => {
              this.uiService.showSuccess('Eliminado', `${bank.name} fue eliminado correctamente.`);
              this.loadBanks();
            },
            error: (err) =>
              this.uiService.showError('Error al eliminar', err.error?.message || 'No se pudo eliminar el banco'),
            complete: () => this.uiService.setLoading(false),
          });
      },
    });
  }

  onListAction(event: ListEvent): void {
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
