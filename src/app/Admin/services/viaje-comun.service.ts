import { HttpClient } from '@angular/common/http';
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
}
