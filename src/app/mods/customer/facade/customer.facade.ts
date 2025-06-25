import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Customer } from '../store/customer-api';
import { CustomerService } from '../services/customer-service';
import { tap, finalize } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class CustomerFacade {




  private customersSubject = new BehaviorSubject<Customer[]>([]);
  
  private loadingSubject = new BehaviorSubject<boolean>(false);
  
  customers$: Observable<Customer[]> = this.customersSubject.asObservable();
  loading$: Observable<boolean> = this.loadingSubject.asObservable();

  constructor(
    private customerService: CustomerService,
    private messageService: MessageService
  ) {}



  // Cargar lista
  load(): void {
    this.loadingSubject.next(true);
    this.customerService.listCustomer().pipe(
      finalize(() => this.loadingSubject.next(false))
    ).subscribe({
      next: (data: Customer[]) => this.customersSubject.next(data),
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error al cargar clientes',
          detail: err.error?.message || 'No se pudo obtener la lista de clientes'
        });
      }
    });
  }

  add(customer: Customer): Observable<any> {
    this.loadingSubject.next(true);
    return this.customerService.addCustomer(customer).pipe(
      finalize(() => this.loadingSubject.next(false)),
      tap({
        next: () => this.load(),
        error: (err) => this.messageService.add({
          severity: 'error',
          summary: 'Error al agregar cliente',
          detail: err.error?.message || 'No se pudo agregar el cliente'
        })
      })
    );
  }


  update(customer: Customer): Observable<any> {
    this.loadingSubject.next(true);
    return this.customerService.updateCustomer(customer).pipe(
      finalize(() => this.loadingSubject.next(false)),
      tap({
        next: () => this.load(),
        error: (err) => this.messageService.add({
          severity: 'error',
          summary: 'Error al actualizar cliente',
          detail: err.error?.message || 'No se pudo actualizar el cliente'
        })
      })
    );
  }


  delete(id: number): Observable<any> {
    this.loadingSubject.next(true);
    return this.customerService.deleteCustomer(id).pipe(
      finalize(() => this.loadingSubject.next(false)),
      tap(() => this.load())
    );
  }


  getById(id: number): Observable<Customer> {
    this.loadingSubject.next(true);
    return this.customerService.getCustomerById(id).pipe(
      finalize(() => this.loadingSubject.next(false))
    );
  }
}