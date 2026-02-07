import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CategoryService } from '../../services/category.service';
import { Observable } from 'rxjs';
import { Category } from '../../models/category.model';

@Component({
    selector: 'app-add-expense-modal',
    templateUrl: './add-expense-modal.component.html',
    styleUrls: ['./add-expense-modal.component.scss'],
    standalone: false
})
export class AddExpenseModalComponent {
    amount: number | null = null;
    description: string = '';
    category: string = '';
    categories$: Observable<Category[]>;

    constructor(
        private modalController: ModalController,
        private categoryService: CategoryService
    ) {
        this.categories$ = this.categoryService.categories$;
    }

    cancel() {
        return this.modalController.dismiss(null, 'cancel');
    }

    confirm() {
        if (this.amount && this.category) {
            this.modalController.dismiss({
                amount: this.amount,
                description: this.description,
                category: this.category
            }, 'confirm');
        }
    }
}
