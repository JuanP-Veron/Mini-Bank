import { Injectable } from "@angular/core";
import { delay, Observable, of } from "rxjs";
import { Customer } from "../models/customer-model";

@Injectable({
  providedIn: 'root'
})
export class CustomerApiService {
  /*
  private url = 'http://54./api/Customer';  EN CASO DE TENER API

  constructor(private api: AppApiService) {}

  addCustomer(data: Customer): Observable<Customer> {
    return this.api.post<Customer>(`${this.url}`, data);
  }

  updateCustomer(data: Customer): Observable<Customer> {
    return this.api.put<Customer>(`${this.url}`, data);
  }

  deleteCustomer(id: number): Observable<void> {
    return this.api.delete<void>(`${this.url}/${id}`);
  }

  listCustomer(): Observable<Customer[]> {
    return this.api.get<Customer[]>(`${this.url}/all`);
  }

  getCustomerById(id: number): Observable<Customer> {
    return this.api.get<Customer>(`${this.url}/${id}`);
  }

  */

  private customers: Customer[] = [
    {
      id: 1,
      name: 'Juan',
      lastname: 'Pérez',
      documentNumber: '12345678',
      address: 'Calle Principal 123',
      mail: 'juan@example.com',
      phone: '098123456',
      customerStatus: 1,
      birth: '1990-01-15',
      bankId: 1
    },
    {
      id: 2,
      name: 'María',
      lastname: 'Gómez',
      documentNumber: '87654321',
      address: 'Avenida Secundaria 456',
      mail: 'maria@example.com',
      phone: '099654321',
      customerStatus: 1,
      birth: '1985-05-20',
      bankId: 2
    }
  ];


  addCustomer(data: Customer): Observable<Customer> {
    const newId = this.customers.length > 0 
      ? Math.max(...this.customers.map(c => c.id ?? 0)) + 1 
      : 1;
    
    const newCustomer: Customer = {
      ...data,
      id: newId
    };

    this.customers.push(newCustomer);
    return of(newCustomer).pipe(delay(500));
  }

updateCustomer(data: Customer): Observable<Customer> {
  const index = this.customers.findIndex(customer => customer.id === data.id);
  if (index !== -1) {
    this.customers[index] = {
      ...this.customers[index],
      ...data // spread operator para actualizar todas las propiedades
    };
  }
  return of(data).pipe(delay(500));
}

  deleteCustomer(id: number): Observable<void> {
    this.customers = this.customers.filter(c => c.id !== id);
    return of(undefined).pipe(delay(500));
  }

  listCustomer(): Observable<Customer[]> {
    return of(this.customers).pipe(delay(500));
  }

}