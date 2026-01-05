import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../../core/services/base.service';
import { Address, CreateAddressRequest, UpdateAddressRequest, AddressesListResponse } from '../models/address.models';

@Injectable({
  providedIn: 'root'
})
export class AddressService extends BaseService<Address, CreateAddressRequest, UpdateAddressRequest, AddressesListResponse> {
  constructor(http: HttpClient) {
    super(http, 'Address');
  }
}
