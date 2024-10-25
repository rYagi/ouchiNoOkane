import { create } from 'zustand';
import { Budget, Expense, Event } from '../types/money';

interface BudgetStore {
  budgets: Budget[];
  expenses: Expense[];
  events: Event[];
  addBudget: (budget: Budget) => void;
  addExpense: (expense: Expense) => void;
  addEvent: (event: Event) => void;
  getCurrentMonthBudget: () => Budget | undefined;
}

export const useBudgetStore = create<BudgetStore>((set, get) => ({
  budgets: [],
  expenses: [],
  events: [],
  
  addBudget: (budget) => set((state) => ({
    budgets: [...state.budgets, budget]
  })),
  
  addExpense: (expense) => set((state) => ({
    expenses: [...state.expenses, expense]
  })),
  
  addEvent: (event) => set((state) => ({
    events: [...state.events, event]
  })),
  
  getCurrentMonthBudget: () => {
    const currentMonth = new Date().toISOString().slice(0, 7);
    return get().budgets.find(budget => budget.month === currentMonth);
  },
}));