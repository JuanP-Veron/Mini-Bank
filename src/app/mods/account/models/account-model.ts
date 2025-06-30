

export interface AccountPost{
    id?: number;
    holder: string;
    number: string;
    type: number;
    currencyId: number;
    customerId: number;
    createSavingAccount: CreateSavingAccount;
    createCurrentAccount: CreateCurrentAccount;
}



export interface CreateSavingAccount {
  savingType:  number;
}

export interface CreateCurrentAccount {
    operationalLimit: number;
    monthAverage: number;
    interest: number;
}
  export interface AccountPutRequest {
      id?: number;
      holder: string;
      number: string;
      balance: number;
      status: number;
      currencyId: number;
      customerId: number;
  }
 
export interface AccountResponse {
    id: number;
    holder: string;
    number: string;
    type: number;
    balance: number;
    status: string;
    currency: number;
    customer: number;
    savingAccount: CreateSavingAccount | null;
    currentAccount: CreateCurrentAccount | null;
}
