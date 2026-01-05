export interface Country {
  id: string;
  number?: string;
  seqNo: number;
  name?: string;
  isActive: boolean;
  note?: string;
}

export interface CreateCountryRequest {
  number?: string;
  name: string;
  isActive: boolean;
  note?: string;
}

export interface UpdateCountryRequest {
  id: string;
  number?: string;
  name: string;
  isActive: boolean;
  note?: string;
}

export interface CountriesListResponse {
  countries: Country[];
  totalPages: number;
  totalCount: number;
  itemsFrom: number;
  itemsTo: number;
  currentPage: number;
  hasPrivious: boolean;
  hasNext: boolean;
}
