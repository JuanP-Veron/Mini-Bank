import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { AppApiService } from '../../../shared/services/app-api.service';
import { BankEntity } from '../models/banks-model';

@Injectable({
  providedIn: 'root'
})
export class BankApiService {
 /* private url = 'http://54.173.20.225:8080/api/Bank';

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
    */

  private Banks: BankEntity[] = [
    {
        id: 1,
        name: 'Banco Itau',
        phone: '093322343',
        mail: 'Correo@gmail.com',
        address: 'buenos Aires',
    },
    {
        id: 2,
        name: 'Banco Rio',
        phone: '09434443',
        mail: 'Correo@gmail.com',
        address: 'Calle Palma',
    }
  ]

  addBank(data: BankEntity): Observable<BankEntity> {
    const newId = Math.max(...this.Banks.map(b => b.id)) + 1;
    const newBank: BankEntity = {
      id: newId,
      name: data.name,
      phone: data.phone,
      mail: data.mail,
      address: data.address,
    }

    this.Banks.push(newBank);
    return of(data);
  }

  //listar bancos
  listBanks() {
    return of(this.Banks).pipe(delay(500));
  }

  //eliminar
  deleteBank(id: number){
    this.Banks = this.Banks.filter(bank => bank.id !== id);
    return of(undefined).pipe(delay(500));
  }

  //actualizar
  updateBank(data: BankEntity) {
    const index = this.Banks.findIndex(bank => bank.id === data.id);
    if (index !== -1) {
      this.Banks[index] = {
        ...this.Banks[index],
              name: data.name,
              phone: data.phone,
              mail: data.mail,
              address: data.address,
      }
    }
    return of(data).pipe(delay(500));
  }
}
