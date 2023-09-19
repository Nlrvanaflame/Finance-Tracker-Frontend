export interface FinancialRecord {
    id: string;
    user_id: string;
    type: 'income' | 'expense';
    amount: number;
    description: string;
    record_date: Date;
  }