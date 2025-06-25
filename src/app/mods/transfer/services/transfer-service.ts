import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { TransferRequest, TransactionFilter } from '../store/transfer-api';

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  private http = inject(HttpClient);
  private baseUrl = 'http://54.173.20.225:8080/api';

  sendTransfer(data: TransferRequest) {
    return this.http.post(`${this.baseUrl}/Transfer`, data).pipe(
      catchError(this.handleError)
    );
  }

  getTransactionHistory(filter: TransactionFilter) {
    let params = new HttpParams();
    Object.entries(filter).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params = params.set(key, value.toString());
      }
    });

    return this.http.get(`${this.baseUrl}/TransactionHistory/filtered`, { params }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    return throwError(() => error);
  }
}
