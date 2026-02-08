import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    public categoriesSubject = new BehaviorSubject<Category[]>([]);
    public categories$ = this.categoriesSubject.asObservable();

    constructor() {
        this.loadInitialCategories();
    }

    private loadInitialCategories() {
        // Default categories
        const initialCategories: Category[] = [
            { id: '1', name: 'Food', icon: 'fast-food' },
            { id: '2', name: 'Transport', icon: 'car' },
            { id: '3', name: 'Entertainment', icon: 'film' },
            { id: '4', name: 'Shopping', icon: 'cart' },
            { id: '5', name: 'Bills', icon: 'receipt' },
            { id: '6', name: 'Health', icon: 'medkit' }
        ];
        this.categoriesSubject.next(initialCategories);
    }

    getCategories(): Observable<Category[]> {
        return this.categories$;
    }

    addCategory(name: string) {
        const currentCategories = this.categoriesSubject.value;
        const newCategory: Category = {
            id: Math.random().toString(36).substr(2, 9),
            name: name.trim(),
            icon: 'bookmark' // Default icon
        };
        this.categoriesSubject.next([...currentCategories, newCategory]);
    }

    deleteCategory(id: string) {
        const currentCategories = this.categoriesSubject.value;
        const updatedCategories = currentCategories.filter(c => c.id !== id);
        this.categoriesSubject.next(updatedCategories);
    }

    updateCategory(id: string, name: string) {
        const currentCategories = this.categoriesSubject.value;
        const updatedCategories = currentCategories.map(c => {
            if (c.id === id) {
                return { ...c, name: name.trim() };
            }
            return c;
        });
        this.categoriesSubject.next(updatedCategories);
    }
}
