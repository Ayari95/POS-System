import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../interfaces/commande.iterface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = 'http://localhost:9090/orders'; // Assuming your Spring Boot backend is running on port 8080

  constructor(private http: HttpClient) { }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}`);
  }

  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}/${id}`);
  }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.baseUrl}`, order);
  }

  updateOrder(id: number, order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.baseUrl}/${id}`, order);
  }

  deleteOrder(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
