import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppService } from '../../../core/services/appService';
import { PRIMENG_MODULES } from '../../../shared/primeng-modules';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CardModule,
    CommonModule,
    PRIMENG_MODULES,
    ProgressSpinnerModule
  ],
  templateUrl: './home-page.html',
  styleUrls: ['./home-page.css']
})
export class HomePage implements OnInit {
  stats$!: Observable<{
    customers: number;
    accounts: number;
    banks: number;
  }>;
  loading = true;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.loadStats();
  }

  private loadStats(): void {
    this.stats$ = forkJoin([
      this.appService.customerApiService.listCustomer(),
      this.appService.accountApiService.listAccount(),
      this.appService.bankApiService.listBanks()
    ]).pipe(
      map(([customers, accounts, banks]) => ({
        customers: customers.length,
        accounts: accounts.length,
        banks: banks.length
      }))
    );

    this.stats$.subscribe({
      next: () => this.loading = false,
      error: () => this.loading = false
    });
  }
}