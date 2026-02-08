import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ExpenseService } from '../services/expense.service';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';

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
    private categoryService: CategoryService,
    private alertController: AlertController
  ) {
    // Check if dark mode is already active (optional check for system pref if we kept system)
    // For now defaulting to false or checking body class if persisted
    this.darkMode = document.documentElement.classList.contains('ion-palette-dark');
  }

  get categories$() {
    return this.categoryService.categories$;
  }

  async addCategory() {
    const alert = await this.alertController.create({
      header: 'New Category',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Category Name'
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
            if (data.name) {
              this.categoryService.addCategory(data.name);
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async editCategory(category: Category) {
    const alert = await this.alertController.create({
      header: 'Edit Category',
      inputs: [
        {
          name: 'name',
          type: 'text',
          value: category.name,
          placeholder: 'Category Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          cssClass: 'alert-button-delete',
          handler: () => {
            this.confirmDeleteCategory(category);
          }
        },
        {
          text: 'Save',
          handler: (data) => {
            if (data.name) {
              this.categoryService.updateCategory(category.id, data.name);
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async confirmDeleteCategory(category: Category) {
    const alert = await this.alertController.create({
      header: 'Delete Category',
      message: `Are you sure you want to delete "${category.name}"? This will not remove existing expenses in this category.`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.categoryService.deleteCategory(category.id);
          }
        }
      ]
    });
    await alert.present();
  }

  deleteCategory(id: string) {
    // Legacy swipe-to-delete now triggers confirmation (if we want to keep swipe)
    const category = this.categoryService.categoriesSubject.value.find(c => c.id === id);
    if (category) {
      this.confirmDeleteCategory(category);
    }
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
