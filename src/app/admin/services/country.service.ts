import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../../core/services/base.service';
import { Country, CreateCountryRequest, UpdateCountryRequest, CountriesListResponse } from '../models/country.models';

@Injectable({
  providedIn: 'root'
})
export class CountryService extends BaseService<Country, CreateCountryRequest, UpdateCountryRequest, CountriesListResponse> {
  constructor(http: HttpClient) {
    super(http, 'Country');
  }
}
