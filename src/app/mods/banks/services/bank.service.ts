import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, throwError} from 'rxjs';

@Injectable({providedIn: 'root'})
export class BankService {

  private http = inject(HttpClient);

  url = 'http://54.173.20.225:8080/api/Bank';

  addBank(data: any) {
    return this.http.post(this.url, data, {
      headers: {
        'Content-Type': 'application/json',
        'accept': '*/*'
      }
    }) .pipe(
      catchError(this.handleError)   // maneja errores aquí
    );

  }

  listBanks() {
    return this.http.get(this.url + '/all');
  }

  private handleError(err: HttpErrorResponse) {
    // Centraliza lógica de error (toast, log, etc.)
    return throwError(() => err);
  }
}
