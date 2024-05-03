import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Especie } from 'src/app/Models/Especie';
import { Transportista } from 'src/app/Models/Transportista';

@Injectable({
  providedIn: 'root'
})
export class TransportistaService {

  private url: string = "http://localhost:4000/api";
  constructor(private http: HttpClient) {

  }

  obtenerTransportistas(){
    return this.http.get<any>(this.url + "/transportista");
  }

  create(t: Transportista){
    const body = t; // Ajusta este objeto según los campos requeridos por tu API
    return this.http.post<Transportista>(this.url + "/transportista", body);
  }

  update(t: Transportista){
    const body = t;
    return this.http.put<Transportista>(this.url + "/transportista/" + t.id, body);
  }
}
