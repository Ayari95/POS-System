import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../interfaces/client.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl = 'http://localhost:9090/client';

  constructor(private http: HttpClient) { }

  getAllClients(): Observable<Client[]>{
    return this.http.get<any>(this.apiUrl); //charger la liste des client du back-end
  }

  deleteClient(idClient: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${idClient}`);
  }
  addClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.apiUrl, client);
  }
  updateClient(client: Client): Observable<Client> {
    return this.http.put<Client>(this.apiUrl, client);
  }
}
