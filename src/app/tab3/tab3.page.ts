import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ExpenseService } from '../services/expense.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page {
  darkMode = false;

  constructor(
    private expenseService: ExpenseService,
    private alertController: AlertController
  ) {
    // Check if dark mode is already active (optional check for system pref if we kept system)
    // For now defaulting to false or checking body class if persisted
    this.darkMode = document.documentElement.classList.contains('ion-palette-dark');
  }

  toggleTheme(event: any) {
    this.darkMode = event.detail.checked;
    document.documentElement.classList.toggle('ion-palette-dark', this.darkMode);
  }

  async resetData() {
    const alert = await this.alertController.create({
      header: 'Reset Data',
      message: 'Are you sure you want to delete all expenses?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.expenseService.resetExpenses();
          }
        }
      ]
    });

    await alert.present();
  }
}
