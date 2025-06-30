import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, NonNullableFormBuilder } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { BankEntity } from '../../models/banks-model';
import { AppService } from '../../../../core/services/appService';
import { PRIMENG_MODULES } from '../../../../shared/primeng-modules';
import { UiService } from '../../../../core/services/UI/ui.service';

@Component({
  selector: 'app-bank-add',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PRIMENG_MODULES,
  ],
  templateUrl: './bank-add.dialog.html',
  styleUrl: './bank-add.dialog.css'
})
export class BankAddDialog implements OnInit {
  bankForm: FormGroup;

  constructor(
    private dialogRef: DynamicDialogRef,
    private appService: AppService,
    private fb: NonNullableFormBuilder,
    private uiService: UiService
  ) {
    this.bankForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required]],
      mail: ['', [Validators.email]],
      address: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  save(): void {
    if (this.bankForm.invalid) {
      this.markAllAsTouched();
      this.uiService.showWarn('Formulario inválido', 'Por favor complete todos los campos requeridos correctamente');
      return;
    }

    const bank: BankEntity = this.bankForm.value;

    this.appService.bankApiService.addBank(bank).subscribe({
      next: () => {
        this.uiService.showSuccess('Éxito', 'Banco guardado correctamente');
        this.dialogRef.close({ success: true, value: bank });
      },
      error: err => {
        const backendMessage = err?.error?.Message;
        if (backendMessage?.includes('ya en uso')) {
          this.uiService.showError('Duplicado', 'Ya existe un banco con ese nombre.');
        } else {
          this.uiService.showError('Error del servidor', 'No se pudo guardar el banco.');
        }
      }
    });
  }

  private markAllAsTouched(): void {
    Object.values(this.bankForm.controls).forEach(control => {
      control.markAsTouched({ onlySelf: true });
    });
  }
}
