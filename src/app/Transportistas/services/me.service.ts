import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Transportista } from 'src/app/Models/Transportista';
import { Camion } from 'src/app/Models/Camion';
import { Acoplado } from 'src/app/Models/Acoplado';
import { Chofer } from 'src/app/Models/Chofer';
import { API_URLS, AppSetings } from 'src/app/Admin/app-setting/app-config.token';

@Injectable({
  providedIn: 'root'
})
export class MeService {

  private url: string = "http://localhost:4000/api";
  private id_transportista: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public id_transportista$ = this.id_transportista.asObservable();

  constructor(private http: HttpClient, @Inject(API_URLS) private Urls: AppSetings) {
    this.url = this.Urls.apiUrl;
  }

  setIdTransportista(id: number) {
    this.id_transportista.next(id);
  }

  getIdTransportista(): number {
    return this.id_transportista.value;
  }

  obtenerTransportista(): Observable<Transportista> {
    const id = this.id_transportista.value;
    if (id > 0) {
      return this.http.get<Transportista>(`${this.url}/transportista/${id}`);
    }
    throw new Error("No hay id de transportista asignado.");
  }

  create(t: Transportista): Observable<Transportista> {
    const body = t; // Ajusta este objeto según los campos requeridos por tu API
    return this.http.post<Transportista>(`${this.url}/transportista`, body);
  }

  update(t: Transportista): Observable<Transportista> {
    const body = t;
    return this.http.put<Transportista>(`${this.url}/transportista/${t.id}`, body);
  }

  getCamiones(): Observable<Camion[]> {
    const id = this.id_transportista.value;
    if (id > 0) {
      return this.http.get<Camion[]>(`${this.url}/camiones/transportista/${id}`);
    }
    throw new Error("No hay id de transportista asignado.");
  }

  getAcoplados(): Observable<Acoplado[]> {
    const id = this.id_transportista.value;
    if (id > 0) {
      return this.http.get<Acoplado[]>(`${this.url}/acoplados/transportista/${id}`);
    }
    throw new Error("No hay id de transportista asignado.");
  }

  getChoferes(): Observable<Chofer[]> {
    const id = this.id_transportista.value;
    if (id > 0) {
      return this.http.get<any>(`${this.url}/choferes/obtenerChoferConTransportista/${id}`);
    }
    throw new Error("No hay id de transportista asignado.");
  }

  asignarViaje(idViaje: number, idTransportista: number, camionId: number, acopladoId: number, choferId: number): Observable<any> {
    const body = {
      viajeId: idViaje,
      transportistaId: idTransportista,
      camionId,
      acopladoId,
      choferId
    };
    return this.http.post(`${this.url}/viaje_comun/tomar-viaje`, body);
  }
}
