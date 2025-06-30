import { Injectable } from "@angular/core";
import { AccountApiService } from "../../mods/account/services/account-api.service";
import { CustomerApiService } from "../../mods/customer/services/customer-api.service";
import { CurrencyApiService } from "../../mods/currency/services/currency-api.service";
import { BankApiService } from "../../mods/banks/services/bank-Api.service";

@Injectable({
  providedIn: 'root'
})

export class AppService {

  constructor(  public customerApiService: CustomerApiService,
    public bankApiService: BankApiService,
    public accountApiService: AccountApiService,
    public currencyApiService: CurrencyApiService,
  ) {}

}