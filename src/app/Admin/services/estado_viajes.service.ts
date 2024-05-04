import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Especie } from 'src/app/Models/Especie';
import { API_URLS, AppSetings } from '../app-setting/app-config.token';
import { EstadoViajes } from 'src/app/Models/EstadoViaje';

@Injectable({
  providedIn: 'root'
})
export class EstadoViajesService {

  private url: string;
  private endpoint: string ="/estado_viajes";

  constructor(private http: HttpClient, @Inject(API_URLS) private Urls: AppSetings) {
    this.url = this.Urls.apiUrl;
  }

  obtenerEstados(){
    return this.http.get<any>(this.url + this.endpoint);
  }

  crear(nombre: string){
    const body = { nombre: nombre }; // Ajusta este objeto según los campos requeridos por tu API
    return this.http.post<EstadoViajes>(this.url + this.endpoint, body);
  }

  update(e: EstadoViajes){
    const body = e;
    return this.http.put<EstadoViajes>(this.url + this.endpoint + '/' + e.id, body);
  }
}
