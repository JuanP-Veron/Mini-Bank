import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { WalletTable } from '../../components/wallet-table/wallet-table';
import { WalletService } from '../../services/wallet-service';
import { Button } from 'primeng/button';
import { DialogService, DynamicDialogRef, DynamicDialogModule } from 'primeng/dynamicdialog';
import { WalletEditDialog } from '../../dialogs/add/wallet-edit/wallet-edit.dialog';
import { Wallet } from '../../store/wallet-api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-wallet-page',
  standalone: true,
  imports: [TableModule, WalletTable, Button, DynamicDialogModule],
  templateUrl: './account-page.html',
  styleUrl: './account-page.css',
  providers: [DialogService]
})
export class WalletPage implements OnInit {

  walletList: Wallet[] = [];
  ref: DynamicDialogRef | undefined;

  constructor(
    private walletService: WalletService,
    private dialogService: DialogService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.walletList = this.walletService.getWalletList;
  }

  onStartAddAction(event?: any) {
    const data = {
      header: 'Agregar Wallet',
      closable: true,
      height: '40dvh',
      width: '50dvh'
    };
    this.ref = this.dialogService.open(WalletEditDialog, data);
    this.ref.onClose.subscribe((result: any) => {
        this.walletList.push(result);
      
    });
  }

  onListAction(event: { type: string; value: Wallet }) {
    switch (event.type) {
      case 'edit':
        this.onEdit(event.value);
        break;
      case 'delete':
        this.onDelete(event.value);
        break;
      default:
        break;
    }
  }

  onEdit(value?: Wallet) {
    const data = {
      data: 
      { wallet: value },
      header: 'Editar Wallet',
      closable: true,
      height: '40dvh',
      width: '50dvh'
    };
    this.dialogService.open(WalletEditDialog, data)
      .onClose
      .subscribe((result: any) => {
        const newWalletList = this.walletService.getWalletList;
        const newWallet = newWalletList.find(w => w.id === result.id);
        if (newWallet) {
          newWallet.id = result.id;
          newWallet.customerId = result.customerId;
          newWallet.money = result.money;
        }
      });
  }

  onDelete(wallet: Wallet) {
    const idx = this.walletList.findIndex(w => w.id === wallet.id);
    if (idx > -1) {
      this.walletList.splice(idx, 1);
      this.messageService.add({
        severity: 'warn',
        summary: 'Wallet eliminada',
        detail: `ID ${wallet.id}`
      });
    }
  }
}

