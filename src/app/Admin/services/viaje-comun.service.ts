import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ViajeComun } from 'src/app/Models/ViajeComun';
import { API_URLS, AppSetings } from '../app-setting/app-config.token';

@Injectable({
  providedIn: 'root'
})
export class ViajeComunService {

  private url: string;
  private endpoint = "/viaje_comun/pendientes";

  constructor(private http: HttpClient, @Inject(API_URLS) private Urls: AppSetings) {
    this.url = this.Urls.apiUrl;
  }

  getPendientes(page: number, pageSize: number): Observable<{ data: ViajeComun[], total: number }> {
    return this.http.get<{ data: ViajeComun[], total: number }>(`${this.url}${this.endpoint}`, {
      params: {
        page: page.toString(),
        pageSize: pageSize.toString()
      }
    });
  }

  listarViajes(page: number, pageSize: number, id_estado?: number[]): Observable<{ data: ViajeComun[], total: number }> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    if (id_estado) {
      id_estado.forEach(estado => {
        params = params.append('id_estado', estado.toString());
      });
    }

    return this.http.get<{ data: ViajeComun[], total: number }>(`${this.url}/viaje_comun/listar-viajes`, { params });
  }

  getViaje(id: number){

    return this.http.get<ViajeComun>(`${this.url}/viaje_comun/${id}`)
  }

  reenviarMensajes(id_viaje: number): Observable<any> {
    return this.http.post(`${this.url}/viaje_comun/reenviar-mensajes`, { id_viaje });
  }

}
