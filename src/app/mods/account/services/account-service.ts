/*import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Account } from '../store/account-api';
import { Observable } from 'rxjs';
import { AppApiService } from '../../../shared/services/app-api.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private apiUrl = '/api/Account';

  constructor(private api: AppApiService) {}



  getFiltered(): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.apiUrl}/filtered`);
  }

  getById(id: number): Observable<Account> {
    return this.http.get<Account>(`${this.apiUrl}/${id}`);
  }

  create(account: Account): Observable<Account> {
    return this.http.post<Account>(this.apiUrl, account);
  }

  update(account: Account): Observable<Account> {
    return this.http.put<Account>(this.apiUrl, account);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}*/