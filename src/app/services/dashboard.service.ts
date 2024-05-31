import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = 'http://localhost:9090/stats';

  constructor(private http: HttpClient) { }

  getStats(): Observable<number[]> {
    return this.http.get<number[]>(this.apiUrl);
  }

  getTotalTransactionAmountByMonth(): Observable<any> {
    return this.http.get<any>(`http://localhost:9090/orders/total-transaction-amount-by-month`);
  }


}
