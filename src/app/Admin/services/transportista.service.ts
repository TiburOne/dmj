import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Especie } from 'src/app/Models/Especie';
import { Transportista } from 'src/app/Models/Transportista';
import { API_URLS, AppSetings } from '../app-setting/app-config.token';

@Injectable({
  providedIn: 'root'
})
export class TransportistaService {

  private url: string = "";
  constructor(private http: HttpClient, @Inject(API_URLS) private Urls: AppSetings) {
    this.url = this.Urls.apiUrl;
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
