export interface Expense {
  id: string;
  date: string; // ISO string for easier JSON handling
  amount: number;
  category: string;
  description: string;
}
