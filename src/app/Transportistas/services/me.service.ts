import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Especie } from 'src/app/Models/Especie';
import { Transportista } from 'src/app/Models/Transportista';

@Injectable({
  providedIn: 'root'
})
export class MeService {

  private url: string = "http://localhost:4000/api";
  private id_transportista: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public id_transportista$ = this.id_transportista.asObservable();
  constructor(private http: HttpClient) {

  }

  setIdTransportista(id : number){
    this.id_transportista.next(id);
  }

  getIdTransportista() : number {
    return this.id_transportista.value;
  }

  obtenerTransportista(){
    const id = this.id_transportista.value;
    if(id > 0){
      return this.http.get<Transportista>(this.url + "/transportista/" + id);
    }
    throw new Error("No hay id de transportista asignado.");

  }

  create(t: Transportista){
    const body = t; // Ajusta este objeto según los campos requeridos por tu API
    return this.http.post<Transportista>(this.url + "/transportista", body);
  }

  update(t: Transportista){
    const body = t;
    return this.http.put<Transportista>(this.url + "/transportista/" + t.id, body);
  }

  getAcoplados(){
    try {

    } catch (error) {
      throw error
    }
  }
}
