import { Injectable, signal} from '@angular/core';

@Injectable({ providedIn: 'root'})
export class AppSecurityService {

  private readonly _isAuthenticated = signal(false);

  get isAuthenticated() {
    return this._isAuthenticated.asReadonly();
  }

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === '1234') {
      this._isAuthenticated.set(true);
      return true;
    } 
      return false;
    }

  logout(): void {
    this._isAuthenticated.set(false);
  }

}

