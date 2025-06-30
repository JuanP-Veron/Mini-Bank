import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppApiService } from '../../../shared/services/app-api.service';
import { BankEntity } from '../models/banks-model';

@Injectable({
  providedIn: 'root'
})
export class BankApiService {
  private url = 'http://54.173.20.225:8080/api/Bank';

  constructor(private api: AppApiService) {}

  // Agregar banco
  addBank(data: any): Observable<any> {
    return this.api.post<any>(`${this.url}`, data);
  }

  // Listar bancos
  listBanks(): Observable<BankEntity[]> {
    return this.api.get<BankEntity[]>(`${this.url}/all`);
  }

  deleteBank(id: number): Observable<void> {
  return this.api.delete<void>(`${this.url}/${id}`);
  }

  unpdateBank(data: any): Observable<any> {
    return this.api.put<any>(`${this.url}`, data);
  }
}
