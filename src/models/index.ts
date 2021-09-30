export interface ITransaction {
  transaction_id: string;
  type: 'income' | 'outcome';
  category_id: string;
  sum: number;
  date: string;
  time: string;
  currency_id: string;
  comment?: string;
}
