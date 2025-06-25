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

  addCustomer(data: any) {
    return this.api.post(`${this.url}`, data);
  }

  updateCustomer(data: any) {
    return this.api.put(`${this.url}`, data);
  }

  deleteCustomer(id: number) {
    return this.api.delete(`${this.url}/${id}`);
  }

  listCustomer(): Observable<Customer[]>{
    return this.api.get<Customer[]>(`${this.url}/all`);
  }

  getCustomerById(id: number): Observable<Customer> {
    return this.api.get<Customer>(`${this.url}/${id}`);
  }

  listFiltered(params: any) {
    return this.api.post(`${this.url}/filtered`, params);
  }
}
