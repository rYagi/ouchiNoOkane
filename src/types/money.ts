export interface Budget {
  id: string;
  month: string;
  excitingMoney: number;
  necessaryMoney: number;
}

export interface Expense {
  id: string;
  date: string;
  amount: number;
  category: 'exciting' | 'necessary';
  description: string;
  excitementLevel?: number; // 1-5のワクワク度
}

export interface Event {
  id: string;
  date: string;
  title: string;
  budgetAmount: number;
  category: 'exciting' | 'necessary';
  excitementLevel?: number;
}