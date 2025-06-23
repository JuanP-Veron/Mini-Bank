import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private jsonPlaceholderUrl = 'https://jsonplaceholder.typicode.com';
  private freeProjectApiUrl = 'https://api.freeprojectapi.com/api/EmployeeApp';

  constructor(private http: HttpClient) { }

  // (de JSONPlaceholder)
  getUsers(limit: number = 5): Observable<any[]> {
    return this.http.get<any[]>(`${this.jsonPlaceholderUrl}/users`).pipe(
      map(users => users.slice(0, limit))
    )
  }

  // (de FreeProjectAPI)
  getDepartments(limit: number = 5): Observable<any[]> {
    return this.http.get<any[]>(`${this.freeProjectApiUrl}/GetDepartments`).pipe(
      map(departments => departments.slice(0, limit))
    )
  }
}