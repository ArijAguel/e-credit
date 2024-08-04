import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Demande } from '../Models/Demande';
import { Garantie } from '../Models/Garantie';




@Injectable({
  providedIn: 'root'
})
export class GarantieService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  enregistrerGarantie(garantie: Garantie): Observable<Garantie> {
    return this.http.post<Garantie>(`${this.apiUrl}/save/garantie`, garantie);
    
  }

  modifierGarantie(garantie: Garantie): Observable<Garantie> {
    return this.http.put<Garantie>(`${this.apiUrl}/update/garantie/${garantie.idGarantie}`, garantie);
  }

  supprimerGarantie(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/garantie/${id}`);

  }



}