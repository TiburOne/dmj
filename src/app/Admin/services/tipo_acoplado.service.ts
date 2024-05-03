import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Especie } from 'src/app/Models/Especie';
import { TipoAcoplado } from 'src/app/Models/Tipo_Acoplado';

@Injectable({
  providedIn: 'root'
})
export class TipoAcopladoService {

  private url: string = "http://localhost:4000/api";
  constructor(private http: HttpClient) {

  }

  obtenerTipos(){
    return this.http.get<TipoAcoplado>(this.url + "/tipo_acoplado");
  }

  crear(t: TipoAcoplado){
    const body = {
      tipo: t.tipo,
      cantidad_ejes : t.cantidad_ejes
    }; // Ajusta este objeto según los campos requeridos por tu API
    return this.http.post<TipoAcoplado>(this.url + "/tipo_acoplado", body);
  }

  update(t: TipoAcoplado){
    const body = t;
    return this.http.put<TipoAcoplado>(this.url + "/tipo_acoplado/" + t.id, body);
  }
}
