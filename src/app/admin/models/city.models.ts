export interface City {
  id: string;
  number?: string;
  seqNo: number;
  name?: string;
  isActive: boolean;
  note?: string;
  countryId?: string;
}

export interface CreateCityRequest {
  number?: string;
  name: string;
  isActive: boolean;
  note?: string;
  countryId?: string;
}

export interface UpdateCityRequest {
  id: string;
  number?: string;
  name: string;
  isActive: boolean;
  note?: string;
}
