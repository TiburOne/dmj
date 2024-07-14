import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Especie } from 'src/app/Models/Especie';
import { Transportista } from 'src/app/Models/Transportista';
import { MeService } from './me.service';
import { Chofer } from 'src/app/Models/Chofer';
import { API_URLS, AppSetings } from 'src/app/Admin/app-setting/app-config.token';

@Injectable({
  providedIn: 'root'
})
export class ChoferService {

  private url: string = "http://localhost:4000/api/choferes";
  private id_transportista: number;
  constructor(private http: HttpClient, meService: MeService, @Inject(API_URLS) private Urls: AppSetings) {
    this.url = this.Urls.apiUrl;
    this.id_transportista = meService.getIdTransportista();

  }

  obtenerChoferes() {

    const id = this.id_transportista;
    if (id > 0) {
      // Usar HttpParams para añadir parámetros de consulta
      const params = new HttpParams().set('id_transportista', id.toString());
      return this.http.get<any>(`${this.url}/obtenerChoferConTransportista/${id}`);
    }
    throw new Error("No hay id de transportista asignado.");

  }

  obtenerChoferesPorTransportista(): Observable<Chofer[]> {
    const id = this.id_transportista;
    if (id > 0) {
      const params = new HttpParams().set('id_transportista', id.toString());
      return this.http.get<Chofer[]>(`${this.url}/por-transportista`, { params });
    }

    throw new Error("No hay id de transportista asignado.");

  }

  create(t: Chofer) {
    const body = {
      ...t, // Ajusta este objeto según los campos requeridos por tu API
      id_transportista: this.id_transportista,
    }

    return this.http.post<Chofer>(this.url, body);
  }

  update(t: Chofer) {
    const body = t;
    return this.http.put<Chofer>(this.url + "/" + t.id, body);
  }

}
