import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Especie } from 'src/app/Models/Especie';

@Injectable({
  providedIn: 'root'
})
export class EspecieService {

  private url: string = "http://localhost:4000/api";
  constructor(private http: HttpClient) {

  }

  obtenerEspecies(){
    return this.http.get<any>(this.url + "/especie");
  }

  crear(nombre: string){
    const body = { nombre: nombre }; // Ajusta este objeto según los campos requeridos por tu API
    return this.http.post<Especie>(this.url + "/especie", body);
  }

  update(e: Especie){
    const body = e;
    return this.http.put<Especie>(this.url + "/especie/" + e.id, body);
  }
}
