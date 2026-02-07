import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ExpenseService } from '../services/expense.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {
  stats$: Observable<{ totalToday: number; total: number }>;

  constructor(private expenseService: ExpenseService) {
    this.stats$ = this.expenseService.getStats();
  }
}
