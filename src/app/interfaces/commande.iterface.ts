
export interface Order {
  id: number;
  client_id: number; 
  product_id: number; 
price: number;
  inventoryStatus: string;
  amount: number;
  orderDate: Date; 
}
