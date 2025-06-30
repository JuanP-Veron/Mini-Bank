import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { Button } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { AppSecurityService } from '../../../services/security/app-security.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    Button,
    InputTextModule,
    FloatLabelModule,
    PasswordModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css'
})
export class LoginPage {
  username = '';
  password = '';


  constructor(
    private security: AppSecurityService,
    private router: Router,
    private messageService: MessageService
  ) {}


  login() {
    const success = this.security.login(this.username, this.password);
    if (success) {
      setTimeout(() => this.router.navigate(['/home']), 1500);
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Credenciales inválidas',
        life: 3000,
      });
    }
  }
}

