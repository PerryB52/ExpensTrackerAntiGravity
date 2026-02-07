import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Expense } from '../models/expense.model';
import { map, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ExpenseService {
    private expensesSubject = new BehaviorSubject<Expense[]>([]);
    public expenses$ = this.expensesSubject.asObservable();
    private dataLoaded = false;

    constructor(private http: HttpClient) {
        this.loadExpenses();
    }

    private loadExpenses() {
        if (!this.dataLoaded) {
            this.http.get<Expense[]>('assets/data/expenses.json').subscribe(data => {
                this.expensesSubject.next(data);
                this.dataLoaded = true;
            });
        }
    }

    getExpenses(): Observable<Expense[]> {
        return this.expenses$;
    }

    addExpense(expense: Expense) {
        const currentExpenses = this.expensesSubject.value;
        // Generate a simple ID if not provided
        if (!expense.id) {
            expense.id = Math.random().toString(36).substr(2, 9);
        }
        this.expensesSubject.next([expense, ...currentExpenses]);
    }

    deleteExpense(id: string) {
        const currentExpenses = this.expensesSubject.value;
        const updatedExpenses = currentExpenses.filter(e => e.id !== id);
        this.expensesSubject.next(updatedExpenses);
    }

    resetExpenses() {
        this.expensesSubject.next([]);
    }

    getStats() {
        return this.expenses$.pipe(
            map(expenses => {
                const today = new Date().toISOString().split('T')[0];
                const totalToday = expenses
                    .filter(e => e.date.startsWith(today))
                    .reduce((acc, curr) => acc + curr.amount, 0);

                const total = expenses.reduce((acc, curr) => acc + curr.amount, 0);

                return {
                    totalToday,
                    total
                };
            })
        );
    }
}
