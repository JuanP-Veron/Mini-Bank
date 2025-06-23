import { Component, inject, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ApiService } from './serviceHttp';

@Component({
  selector: 'app-wallet-table',
  standalone: true,
  imports: [TableModule, CommonModule],
  templateUrl: './httpCliente.html',
  styleUrl: './httpCliente.css'
})
export class GetApi implements OnInit {
  private apiService = inject(ApiService);
  userList: any[] = [];
  
  deparList: any[] = [];

  ngOnInit(): void {
    this.getUsers();

    this.getDepart();
  }

  getUsers() {
    this.apiService.getUsers(5).subscribe({
      next: (resultado) => this.userList = resultado,
      error: (err) => console.error(err)
    });
  }

  getDepart() {
    this.apiService.getDepartments(5).subscribe({
      next: (resul) => this.deparList = resul,
      error: (err) => console.error(err)
    });
  }
}