import { Injectable } from '@angular/core';
import { AccountPost, AccountPutRequest, AccountResponse } from '../models/account-model';
import { Observable } from 'rxjs';
import { AppApiService } from '../../../shared/services/app-api.service';

@Injectable({
  providedIn: 'root',
})
export class AccountApiService {
  private apiUrl = 'http://54.173.20.225:8080/api/Account';

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
/*
  getById(id: number): Observable<Account> {
    return this.http.get<Account>(`${this.apiUrl}/${id}`);
  }

  create(account: Account): Observable<Account> {
    return this.http.post<Account>(this.apiUrl, account);
  }


    */
}