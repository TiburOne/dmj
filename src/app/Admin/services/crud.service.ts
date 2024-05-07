import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { Base } from 'src/app/Models/Base';
import { API_URLS, AppSetings } from '../app-setting/app-config.token';

export interface ServiceConfig {
  endpoint: string;
}

export const SERVICE_CONFIG = new InjectionToken<ServiceConfig>('ServiceConfig');

@Injectable({
  providedIn: 'root'
})
export class CRUDService<T extends Base> {
  private url: string ;
  private endpoint: string;

  constructor(private http: HttpClient,  @Inject(API_URLS) private Urls: AppSetings, @Inject(SERVICE_CONFIG) config: ServiceConfig) {
    this.url = Urls.apiUrl;
    this.endpoint = config.endpoint
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(`${this.url}/${this.endpoint}`);
  }

  get(id: number): Observable<T> {
    return this.http.get<T>(`${this.url}/${this.endpoint}/${id}`);
  }

  create(item: T): Observable<T> {
    return this.http.post<T>(`${this.url}/${this.endpoint}`, item);
  }

  update(id: number, item: T): Observable<T> {
    return this.http.put<T>(`${this.url}/${this.endpoint}/${id}`, item);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${this.endpoint}/${id}`);
  }
}
