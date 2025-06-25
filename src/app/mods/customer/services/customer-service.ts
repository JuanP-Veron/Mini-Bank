import { Injectable } from "@angular/core";
import { AppApiService } from "../../../shared/services/app-api.service";
import { Observable } from "rxjs";
import { Customer } from "../store/customer-api";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private url = 'http://54.173.20.225:8080/api/Customer';

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

  listFiltered(params: any): Observable<Customer[]> {
    return this.api.post<Customer[]>(`${this.url}/filtered`, params);
  }
}