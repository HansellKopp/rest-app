import { Category } from "./category-interface";

export interface Product {
    id: string;
    name: string;
    price: number;
    tax: number;
    image: string;
    category: Category;
}