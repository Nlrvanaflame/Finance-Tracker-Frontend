export interface FinancialRecord {
    id: string;
    user_id: string;
    type: 'income' | 'expense';
    amount: number;
    description: string;
    record_date: Date;
  }

  export type updateRecord = Pick<FinancialRecord, 'user_id' | 'type' 
  | 'amount' | 'description'>

  export type NewFinancialRecord = Omit<FinancialRecord , "id" >