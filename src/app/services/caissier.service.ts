import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Caissier } from '../interfaces/caissier.interface';

@Injectable({
  providedIn: 'root'
})
export class CaissierService {

  private apiUrl = 'http://localhost:9090/caissier';

  constructor(private http: HttpClient) { }

  getAllCaissier(): Observable<Caissier[]>{
    return this.http.get<any>(this.apiUrl); //charger la liste des client du back-end
  }

  deleteCaissier(idCaissier: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${idCaissier}`);
  }
  addCaissier(caissier: Caissier): Observable<Caissier> {
    return this.http.post<Caissier>(this.apiUrl, caissier);
  }
  updateCaissier(caissier: Caissier): Observable<Caissier> {
    return this.http.put<Caissier>(this.apiUrl, caissier);
  }
}
