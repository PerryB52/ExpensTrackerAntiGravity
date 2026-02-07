import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Expense } from '../models/expense.model';
import { ExpenseService } from '../services/expense.service';
import { AddExpenseModalComponent } from '../components/add-expense-modal/add-expense-modal.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {
  expenses$: Observable<Expense[]>;

  constructor(
    private expenseService: ExpenseService,
    private modalController: ModalController
  ) {
    this.expenses$ = this.expenseService.getExpenses();
  }

  async presentAddExpenseModal() {
    const modal = await this.modalController.create({
      component: AddExpenseModalComponent
    });

    modal.onWillDismiss().then((data) => {
      if (data.role === 'confirm') {
        const expenseData = data.data;
        const newExpense: Expense = {
          id: '',
          date: new Date().toISOString(),
          amount: parseFloat(expenseData.amount),
          category: expenseData.category,
          description: expenseData.description || ''
        };
        this.expenseService.addExpense(newExpense);
      }
    });

    await modal.present();
  }

  deleteExpense(id: string) {
    this.expenseService.deleteExpense(id);
  }
}
