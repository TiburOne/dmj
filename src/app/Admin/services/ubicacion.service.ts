import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Especie } from 'src/app/Models/Especie';
import { API_URLS, AppSetings } from '../app-setting/app-config.token';

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {

  private url: string ;
  private endpoint = "/ubicacion";
  constructor(private http: HttpClient, @Inject(API_URLS) private Urls: AppSetings) {
    this.url = this.Urls.apiUrl
  }

  obtenerEspecies(){
    return this.http.get<any>(this.url +this.endpoint);
  }

  crear(nombre: string){
    const body = { nombre: nombre }; // Ajusta este objeto según los campos requeridos por tu API
    return this.http.post<Especie>(this.url + this.endpoint, body);
  }

  update(e: Especie){
    const body = e;
    return this.http.put<Especie>(this.url + this.endpoint + e.id, body);
  }
}
