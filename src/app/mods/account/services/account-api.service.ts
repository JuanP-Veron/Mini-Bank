import { Injectable } from '@angular/core';
import { AccountPost, AccountPutRequest, AccountResponse } from '../models/account-model';
import { delay, Observable, of } from 'rxjs';
// import { AppApiService } from '../../../shared/services/app-api.service';

@Injectable({
  providedIn: 'root',
  })
  export class AccountApiService {
    /*
  private apiUrl = 'http://54/api/Account'; EN CASO QUE SEA O TENGAS UN API 

  constructor(private api: AppApiService) {}

  addAccount(data: AccountPost): Observable<AccountPost>{
    return this.api.post<AccountPost>(`${this.apiUrl}`, data);
  }

  listAccount(): Observable<AccountResponse[]> {
    return this.api.get<AccountResponse[]>(`${this.apiUrl}/all`);
  }
  deleteAccount(id: number): Observable<void> {
    return this.api.delete<void>(`${this.apiUrl}/${id}`);
  }
  updateAccount(data: AccountPutRequest): Observable<AccountPutRequest> {
    return this.api.put<AccountPutRequest>(`${this.apiUrl}`, data);
  }
  getById(id: number): Observable<Account> {
    return this.http.get<Account>(`${this.apiUrl}/${id}`);
  }

    */

  // Datos locales en lugar de la API
  private accounts: AccountResponse[] = [
    {
      id: 1,
      holder: 'Juan Pérez',
      number: '1234567890',
      type: 1,
      balance: 1500.50,
      status: 'Activa',
      currency: 1,
      customer: 1,
      savingAccount: { savingType: 1 },
      currentAccount: null
    },
    {
      id: 2,
      holder: 'María García',
      number: '0987654321',
      type: 2,
      balance: 3200.75,
      status: 'Activa',
      currency: 2,
      customer: 2,
      savingAccount: null,
      currentAccount: { operationalLimit: 5000, monthAverage: 3000, interest: 1.5 }
    },
  ];

 

  // agregar una cuenta
  addAccount(data: AccountPost): Observable<AccountPost> {
    const newId = Math.max(...this.accounts.map(a => a.id)) + 1;
    const newAccount: AccountResponse = {
      id: newId,
      holder: data.holder,
      number: data.number,
      type: data.type,
      balance: 0, // Balance inicial
      status: 'Activa',
      currency: data.currencyId,
      customer: data.customerId,
      savingAccount: data.createSavingAccount,
      currentAccount: data.createCurrentAccount
    };
    
    this.accounts.push(newAccount);
    return of(data).pipe(delay(500)); 
  }

  //listar
  listAccount(): Observable<AccountResponse[]> {
    return of(this.accounts).pipe(delay(500));
  }

  //  eliminar
  deleteAccount(id: number): Observable<void> {
    this.accounts = this.accounts.filter(account => account.id !== id);
    return of(undefined).pipe(delay(500));
  }

  // actualizar
  updateAccount(data: AccountPutRequest): Observable<AccountPutRequest> {
    const index = this.accounts.findIndex(account => account.id === data.id);
    if (index !== -1) {
      this.accounts[index] = {
        ...this.accounts[index],
        holder: data.holder,
        number: data.number,
        balance: data.balance,
        status: data.status.toString(),
        currency: data.currencyId,
        customer: data.customerId
      };
    }
    return of(data).pipe(delay(500)); // Simulamos un pequeño retardo
  }

  //para obtener por ID
  getById(id: number): Observable<AccountResponse | undefined> {
    const account = this.accounts.find(a => a.id === id);
    return of(account);
  }
}
