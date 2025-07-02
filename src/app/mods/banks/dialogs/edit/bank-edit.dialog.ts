import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

import { BankEntity } from '../../models/banks-model';
import { AppService } from '../../../../core/services/appService';
import { UiService } from '../../../../core/services/UI/ui.service';
import { PRIMENG_MODULES } from '../../../../shared/primeng-modules';

@Component({
  selector: 'app-bank-edit',
  standalone: true,
  imports: [
    PRIMENG_MODULES,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './bank-edit.dialog.html',
  styleUrl: './bank-edit.dialog.css'
})
export class BankEditDialog implements OnInit {
  model: BankEntity = {
    id: 0,
    name: '',
    phone: '',
    mail: '',
    address: ''
  };

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private appService: AppService,
    private ui: UiService
  ) {}

  ngOnInit(): void {
    if (this.config.data?.bank) {
      this.model = { ...this.config.data.bank };
    }
  }

  save(): void {
    this.ui.setLoading(true);
    this.appService.bankApiService.updateBank(this.model).subscribe({
      next: () => {
        this.ui.showSuccess('Banco actualizado', 'Se guardaron correctamente');
        this.ref.close({ success: true });
      },
      error: (err) => {
        this.ui.showError('Error al guardar', 'No se pudo actualizar el banco');
        console.error('Error al actualizar banco', err);
      },
      complete: () => this.ui.setLoading(false)
    });
  }
}
