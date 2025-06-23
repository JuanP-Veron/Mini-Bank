import {inject, Injectable} from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {


  private http = inject(HttpClient);


  url = 'http://54.173.20.225:8080/api/Customer';

  addCustomer(data: any) {
    return this.http.post(this.url, data).pipe(
      catchError(this.handleError)
    )
  }


  deleteCustomer(id: number) {
  return this.http.delete(`${this.url}/${id}`).pipe(
    catchError(this.handleError)
  );
}



  listCustomer() {
    return this.http.get(this.url + '/all').pipe(
       catchError(this.handleError)
    )
  }


    private handleError(err: HttpErrorResponse) {
      // Centraliza lógica de error (toast, log, etc.)
      return throwError(() => err);
    }
}
