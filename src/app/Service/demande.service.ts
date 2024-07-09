import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Demande } from '../Models/Demande';
import { Client } from '../Models/Client';


@Injectable({
  providedIn: 'root'
})
export class DemandeService {


  private apiUrl = 'http://localhost:8080'; 

  constructor(private http: HttpClient) { }

  getClientByCin(cin: number): Observable<Client> {
    return this.http.get<Client>(`${this.apiUrl}/clients/cin/${cin}`);
  }

  // getClientByCin(cin: number): Observable<{ client: Client; listeNumComptes: number[] }> {
  //   return this.http.get<{ client: Client; listeNumComptes: number[] }>(`${this.apiUrl}/clients/cin/${cin}`);
  // }

  saveDemande(demande: Demande): Observable<Demande> {
    return this.http.post<Demande>(this.apiUrl+"/save/demande", demande);
  }
  








}


