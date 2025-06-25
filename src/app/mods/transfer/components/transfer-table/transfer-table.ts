import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-transfer-table',
  imports: [TableModule, CommonModule],
  templateUrl: './transfer-table.html',
  styleUrl: './transfer-table.css'
})
export class TransferTable {
  @Input() transactions: any[] = [];
  @Output() action = new EventEmitter<{ type: string, value: any }>();
}
