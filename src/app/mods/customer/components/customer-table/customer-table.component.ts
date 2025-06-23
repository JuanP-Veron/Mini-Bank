import { Component, EventEmitter, Input, Output, SimpleChanges, OnChanges } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Button } from 'primeng/button';
import { Customer } from '../../store/customer-api';

@Component({
  selector: 'app-customer-table',
  imports: [TableModule, Button], 
  templateUrl: './customer-table.component.html',
  styleUrl: './customer-table.component.css'
})
export class CustomerTableComponent implements OnChanges {

  _list: Customer[] = [];

  @Input() set list(list: Customer[]) {
    this._list = list;
  }

  @Output() action = new EventEmitter<{ type: string, value: Customer }>();

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    console.log("me cambie", changes);
  }

  // Click en fila (seleccionar)
  onRowClick(customer: Customer, event: Event) {
    event.stopPropagation();
    this.action.emit({
      type: "selected",
      value: customer
    });
  }

  // Click en botón de editar
  onEdit(customer: Customer, event: Event) {
    event.stopPropagation();
    this.action.emit({
      type: "edit",
      value: customer
    });
  }

  // Click en botón de eliminar
  onDelete(customer: Customer, event: Event) {
    event.stopPropagation();
    this.action.emit({
      type: "delete",
      value: customer
    });
  }
}
