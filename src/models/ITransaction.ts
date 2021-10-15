export interface ITransaction {
  transaction_id?: string;
  type: 'income' | 'outcome';
  transaction_category_id: string;
  sum: number;
  date: string;
  currency_alphabetic_code: string;
  comment?: string;
}
