import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Demande } from '../Models/Demande';
import { Client } from '../Models/Client';
import { DemandeDTO } from '../Models/DemandeDTO';


@Injectable({
  providedIn: 'root'
})
export class DemandeService {


  private apiUrl = 'http://localhost:8080'; 

  constructor(private http: HttpClient) { }

  getClientByCin(cin: number): Observable<Client> {
    return this.http.get<Client>(`${this.apiUrl}/clients/cin/${cin}`);
  }

 

  getListeDemandes(): Observable<DemandeDTO[]> {
    return this.http.get<DemandeDTO[]>(`${this.apiUrl}/get/demandes`);
  }

  saveDemande(demande: Demande): Observable<Demande> {
    return this.http.post<Demande>(this.apiUrl+"/save/demande", demande);
  }
  
  getDemandeById(idDemande: number): Observable<Demande> {
    return this.http.get<Demande>(`${this.apiUrl}/get/demande/${idDemande}`);
  }

  // updateDemande(idDemande: number): Observable<Demande> {
  //   return this.http.get<Demande>(`${this.apiUrl}/update/demande/${idDemande}`);
  // }







}


