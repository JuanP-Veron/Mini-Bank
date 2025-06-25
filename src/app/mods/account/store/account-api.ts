
export interface Account {
  id?: number;
  holder: string;
  number: string;
  type: number;
  currencyId: number;
  customerId: number;
  balance?: number;
  status?: number;

  createSavingAccount?: {
    savingType: number;
  };

  createCurrentAccount?: {
    operationalLimit: number;
    monthAverage: number;
    interest: number;
  };
}
  