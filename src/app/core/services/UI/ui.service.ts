
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  constructor(private messageService: MessageService) {}


  setLoading(isLoading: boolean): void {
    this.loadingSubject.next(isLoading);
  }

  // Mensajes genéricos
  showMessage(severity: 'success' | 'info' | 'warn' | 'error', summary: string, detail: string): void {
    this.messageService.add({ severity, summary, detail });
  }

  // Atajos útiles
  showSuccess(summary: string, detail: string): void {
    this.showMessage('success', summary, detail);
  }

  showError(summary: string, detail: string): void {
    this.showMessage('error', summary, detail);
  }

  showInfo(summary: string, detail: string): void {
    this.showMessage('info', summary, detail);
  }

  showWarn(summary: string, detail: string): void {
    this.showMessage('warn', summary, detail);
  }
}
