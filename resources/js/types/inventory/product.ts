import { Category } from '@/types/inventory/category';

export interface Product {
    id: number;
    name: string;
    price: number;
    category: Category;
}
