import { Order } from "./commande.iterface";

export interface Product {
    id: number;
    name: string;
    image: string;
    price: number;
    category: string;
    rating: number;
    inventoryStatus: string;
    amount: number;
    orders?: Order[];
}
