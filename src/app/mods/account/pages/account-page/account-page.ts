import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService } from 'primeng/api';

import { AccountPutRequest, AccountResponse } from '../../models/account-model';
import { AccountTable } from '../../components/account-table/account-table';
import { AppService } from '../../../../core/services/appService';
import { AccountEditDialog } from '../../dialogs/edit/account-edit/account-edit.dialog';
import { ListEvent } from '../../../../shared/utils';
import { CommonModule, AsyncPipe } from '@angular/common';
import { PRIMENG_MODULES } from '../../../../shared/primeng-modules';
import { UiService } from '../../../../core/services/UI/ui.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AccountAddDialog } from '../../dialogs/add/account-add/account-add.dialog';

@Component({
  selector: 'app-account-page',
  standalone: true,
  imports: [
    PRIMENG_MODULES,
    AccountTable,
    CommonModule,
    AsyncPipe,
    ProgressSpinnerModule
  ],
  templateUrl: './account-page.html',
  styleUrl: './account-page.css',
})
export class AccountPage implements OnInit, OnDestroy {
  accountList = new BehaviorSubject<AccountResponse[]>([]);
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
    this.loadAccount();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.ref?.close();
  }

  private loadAccount(): void {
    this.uiService.setLoading(true);
    this.appService.accountApiService.listAccount()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (accounts) => this.accountList.next(accounts),
        error: (err) =>
          this.uiService.showError('Error al cargar cuentas', err.error?.message || 'No se pudo obtener la lista'),
        complete: () => this.uiService.setLoading(false),
      });
  }
 
  onAdd(): void {
    this.ref = this.dialogService.open(AccountAddDialog, {
      header: 'Nueva Cuenta',
      closable: true,
      width: '70dvh',
      height: '80dvh',
    });

    this.ref.onClose.pipe(takeUntil(this.destroy$)).subscribe((result) => {
      if (result?.success) {
        this.loadAccount();
        this.uiService.showSuccess('Cuenta agregada', 'La cuenta fue creada correctamente.');
      }
      this.ref = null;
    });
  }

  onEdit(account: AccountPutRequest): void {
    this.ref = this.dialogService.open(AccountEditDialog, {
      data: { account },
      header: 'Editar Cuenta',
      closable: true,
      width: '70dvh',
      height: '80dvh',
    });

    this.ref.onClose.pipe(takeUntil(this.destroy$)).subscribe((result) => {
      if (result?.success) {
        this.loadAccount();
        this.uiService.showSuccess('Cuenta actualizada', 'Los cambios fueron guardados.');
      }
      this.ref = null;
    });
  }

  onDelete(account: AccountResponse): void {
    if (!account?.id) return;

    this.confirmationService.confirm({
      message: `¿Estás seguro de que querés eliminar la cuenta <b>${account.holder}</b>?`,
      header: 'Eliminar Cuenta',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Eliminar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.uiService.setLoading(true);
        this.appService.accountApiService.deleteAccount(account.id!)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: () => {
              this.uiService.showSuccess('Cuenta eliminada', `${account.holder} fue eliminada correctamente.`);
              this.loadAccount();
            },
            error: (err) =>
              this.uiService.showError('Error al eliminar', err.error?.message || 'No se pudo eliminar la cuenta.'),
            complete: () => this.uiService.setLoading(false),
          });
      }
    });
  }

  handleTableAction(event: ListEvent): void {
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
