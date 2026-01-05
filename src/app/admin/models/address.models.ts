export interface Address {
  id: string;
  number?: string;
  seqNo: number;
  name?: string;
  isActive: boolean;
  note?: string;
  addressLine?: string;
  supplierId: string;
  countryId: string;
  countryName?: string;
  cityId: string;
  cityName?: string;
}

export interface CreateAddressRequest {
  number?: string;
  seqNo: number;
  name?: string;
  isActive: boolean;
  note?: string;
  addressLine?: string;
  supplierId?: string;
  countryId: string;
  cityId: string;
}

export interface UpdateAddressRequest {
  id: string;
  name: string;
  addressLine?: string;
  isActive: boolean;
  number?: string;
  note?: string;
  supplierId: string;
  countryId?: string;
  cityId?: string;
}

export interface AddressesListResponse {
  addresses: Address[];
  totalPages: number;
  totalCount: number;
  itemsFrom: number;
  itemsTo: number;
  currentPage: number;
  hasPrivious: boolean;
  hasNext: boolean;
}
