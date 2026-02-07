import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Expense } from '../models/expense.model';
import { ExpenseService } from '../services/expense.service';

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
    private alertController: AlertController
  ) {
    this.expenses$ = this.expenseService.getExpenses();
  }

  async presentAddExpenseAlert() {
    const alert = await this.alertController.create({
      header: 'New Expense',
      inputs: [
        {
          name: 'amount',
          type: 'number',
          placeholder: 'Amount',
          min: 0
        },
        {
          name: 'category',
          type: 'text',
          placeholder: 'Category (e.g., Food)'
        },
        {
          name: 'description',
          type: 'text',
          placeholder: 'Description'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: (data) => {
            if (data.amount && data.category) {
              const newExpense: Expense = {
                id: '', // Service handles ID
                date: new Date().toISOString(),
                amount: parseFloat(data.amount),
                category: data.category,
                description: data.description || ''
              };
              this.expenseService.addExpense(newExpense);
            }
          }
        }
      ]
    });

    await alert.present();
  }

  deleteExpense(id: string) {
    this.expenseService.deleteExpense(id);
  }
}
