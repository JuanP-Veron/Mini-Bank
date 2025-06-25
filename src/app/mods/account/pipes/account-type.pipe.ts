

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'accountType',
  standalone: true
})
export class AccountTypePipe implements PipeTransform {
  transform(value: number): string {
    switch (value) {
      case 0: return 'Ahorro';
      case 1: return 'Corriente';
      default: return 'Desconocido';
    }
  }
}
