import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {
  private apiUrl = 'https://maps.googleapis.com/maps/api/geocode/json';

  constructor(private http: HttpClient) { }

  getGeocode(lat: number, lng: number, apiKey: string) {
    const url = `${this.apiUrl}?latlng=${lat},${lng}&key=${apiKey}&enable_address_descriptor=true`;
    return this.http.get(url);
  }
}
