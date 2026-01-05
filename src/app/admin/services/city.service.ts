import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { City, CreateCityRequest, UpdateCityRequest } from '../models/city.models';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private readonly baseUrl = `${environment.apiUrl}/country`;

  constructor(private http: HttpClient) {}

  getCitiesForCountry(countryId: string): Observable<City[]> {
    return this.http.get<City[]>(`${this.baseUrl}/${countryId}/City`);
  }

  getCityById(countryId: string, cityId: string): Observable<City> {
    return this.http.get<City>(`${this.baseUrl}/${countryId}/City/${cityId}`);
  }

  create(countryId: string, request: CreateCityRequest): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/${countryId}/City`, request);
  }

  update(countryId: string, cityId: string, request: UpdateCityRequest): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${countryId}/City/${cityId}`, request);
  }

  delete(countryId: string, cityId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${countryId}/City/${cityId}`);
  }
}
