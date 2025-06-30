import { Component, EventEmitter, Input, Output, SimpleChanges, OnChanges } from '@angular/core';
import { Customer } from '../../models/customer-model';
import { PRIMENG_MODULES } from '../../../../shared/primeng-modules';
import { FallbackPipe } from '../../../../shared/pipes/fallback.pipe';

@Component({
  selector: 'app-customer-table',
  imports: [PRIMENG_MODULES,  FallbackPipe], 
  templateUrl: './customer-table.html',
  styleUrl: './customer-table.css'
})
export class CustomerTable implements OnChanges {
  _list: Customer[] = [];

  @Input() set list(list: Customer[]) {
    this._list = list;
  }

  @Output() action = new EventEmitter<{ type: string, value: Customer }>();

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    console.log("Me cambié", changes);
  }

  // Botón de editar
  onEdit(customer: Customer, event: Event): void {
    event.stopPropagation();
    this.action.emit({
      type: 'edit',
      value: customer
    });
  }

  // Botón de eliminar
  onDelete(customer: Customer, event: Event): void {
    event.stopPropagation();
    this.action.emit({
      type: 'delete',
      value: customer
    });
  }
}