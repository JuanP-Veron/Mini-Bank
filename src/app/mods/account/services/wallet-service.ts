import { Injectable } from "@angular/core";
import { Wallet } from "../store/wallet-api";

@Injectable({
    providedIn: 'root'
})

export class WalletService {
    private walletList: Wallet[] = [
        {
            id: 1,
            customerId: 2,
            money: 3000 
        },
        { 
            id: 2,
            customerId: 2,
            money: 2000 
        },
        { 
            id: 3,
            customerId: 3,
            money: 200 
        }
    ]

    get getWalletList(): Wallet[] {
        return this.walletList;
    }
}