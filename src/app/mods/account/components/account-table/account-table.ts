import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountResponse } from '../../models/account-model';
import { FallbackPipe } from '../../../../shared/pipes/fallback.pipe';
import { PRIMENG_MODULES } from '../../../../shared/primeng-modules';

@Component({
  selector: 'app-account-table',
  standalone: true,
  imports: [
    CommonModule,
    FallbackPipe,
    PRIMENG_MODULES
  ],
  templateUrl: './account-table.html',
  styleUrl: './account-table.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountTable {


  _list: AccountResponse[] = [];


  @Input() set list(list: AccountResponse[]) {
    this._list = list;
  }

  @Output() action = new EventEmitter<{ type: string, value: AccountResponse }>();

  constructor() {}

  onEdit(account: AccountResponse, event: Event) {
    event.stopPropagation();
    this.action.emit({ type: 'edit', value: account });
  }

  onDelete(account: AccountResponse, event: Event) {
    event.stopPropagation();
    this.action.emit({ type: 'delete', value: account });
  }


}
