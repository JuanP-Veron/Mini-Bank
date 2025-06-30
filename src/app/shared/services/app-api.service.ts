import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppApiService {
  constructor(private http: HttpClient) {}

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(url).pipe(
      retry(1),
      catchError(this.handleError));
  }

  post<T>(url: string, data: any): Observable<T> {
    return this.http.post<T>(url, data).pipe(
      retry(1),
      catchError(this.handleError));
  }

  put<T>(url: string, data: any): Observable<T> {
    return this.http.put<T>(url, data).pipe(
      retry(1),
      catchError(this.handleError));
  }

  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(url).pipe(
      retry(1),
      catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    // mostrar toasts, etc.
    return throwError(() => error);
  }
}
