import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { TransferService } from '../../services/transfer-service';
import { TransferRequest } from '../../store/transfer-api';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-transfer-add.dialog',
  imports: [ButtonModule, ReactiveFormsModule],
  templateUrl: './transfer-add.dialog.html',
  styleUrl: './transfer-add.dialog.css'
})
export class TransferAddDialog {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ref: DynamicDialogRef,
    private transferService: TransferService,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      originAccountId: [null, Validators.required],
      transferType: [0, Validators.required],
      denstinationBankId: [null, Validators.required],
      accountNumber: ['', Validators.required],
      documentNumber: ['', Validators.required],
      currencyId: [1, Validators.required],
      amount: [0, [Validators.required, Validators.min(1)]],
      concept: ['', Validators.required]
    });
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.messageService.add({ severity: 'warn', summary: 'Formulario inválido', detail: 'Complete todos los campos' });
      return;
    }

    const payload: TransferRequest = this.form.value;

    this.transferService.sendTransfer(payload).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Transferencia enviada', detail: 'Se completó con éxito' });
        this.ref.close({ success: true });
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error?.message || 'Falló la transferencia' });
        console.error('Transferencia fallida', err);
      }
    });
  }

}
