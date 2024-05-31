import { Product } from "./product.interface";

export interface Stock {
    id: number;
    productId: Product;
    quantity: number;
}
