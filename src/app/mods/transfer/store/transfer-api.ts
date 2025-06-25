export interface TransferRequest {
  originAccountId: number;
  transferType: number;
  denstinationBankId: number;
  accountNumber: string;
  documentNumber: string;
  currencyId: number;
  amount: number;
  concept: string;
}

export interface TransactionFilter {
  AccountId?: number;
  Month?: number;
  Year?: number;
  DateFrom?: string;
  DateTo?: string;
  Concept?: number;
}
