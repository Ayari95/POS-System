import { Order } from "./commande.iterface";

export interface Client {
    id: number;
    name: string;
    email: string;
    phone: string;
    orders: Order[];
}
  