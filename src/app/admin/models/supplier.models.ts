export interface Supplier {
  id: string;
  number?: string;
  seqNo: number;
  name: string;
  isActive: boolean;
  note?: string;
  taxRegistrationNum?: string;
  commercialLicenseNum?: string;
  website?: string;
  ownerId?: string;
  wfStatus?: string;
}

export interface SupplierDetails extends Supplier {
  addresses?: SupplierAddress[];
  contacts?: SupplierContact[];
  categories?: SupplierCategory[];
  supplierFiles?: SupplierFile[];
}

export interface SupplierAddress {
  id?: string;
  name: string;
  number?: string;
  addressLine?: string;
  countryId: string;
  countryName?: string;
  cityId: string;
  cityName?: string;
  supplierId?: string;
}

export interface SupplierContact {
  id?: string;
  name: string;
  designation: string;
  email: string;
  phone: string;
  mobile: string;
  isPrimary: boolean;
  supplierId?: string;
}

export interface SupplierCategory {
  id?: string;
  categoryId: string;
  categoryName?: string;
  supplierId?: string;
}

export interface SupplierFile {
  id?: string;
  name: string;
  fileName?: string;
  filePath?: string;
  fileDescription?: string;
  fileExtension?: string;
  fileContentType?: string;
  fileSizeInBytes?: number;
  fileData?: string; // base64
  supplierId?: string;
}

export const SupplierDocumentTypes = {
  TradeLicense: 'Trade License',
  PowerOfAttorney: 'Power of Attorney',
  CompanyProfile: 'Company Profile',
  VATCertificate: 'VAT Certificate',
  ICVCertificate: 'ICV Certificate',
  Other: 'Other'
} as const;

export interface SupplierLov {
  id: string;
  name: string;
}

export interface SuppliersListResponse {
  suppliers: Supplier[];
  totalPages: number;
  totalCount: number;
  itemsFrom: number;
  itemsTo: number;
  currentPage: number;
  hasNext: boolean;
  hasPrivious: boolean;
}

export interface CreateSupplierRequest {
  number?: string;
  name: string;
  isActive: boolean;
  note?: string;
  taxRegistrationNum?: string;
  commercialLicenseNum?: string;
  website?: string;
  ownerId?: string;
  addresses?: SupplierAddress[];
  contacts?: SupplierContact[];
  supplierCategories?: { categoryId: string }[];
  supplierFiles?: SupplierFile[];
}

export interface UpdateSupplierRequest {
  id: string;
  number?: string;
  name: string;
  isActive: boolean;
  note?: string;
  taxRegistrationNum?: string;
  commercialLicenseNum?: string;
}

export interface ChangeSupplierApprovalRequest {
  id: string;
  seqNo: number;
  levelId: string;
  actionBy: string;
  action: string;
  actionComment?: string;
}

export interface CancelSupplierRequest {
  id: string;
  actionComment?: string;
}

export interface ActivateSupplierRequest {
  id: string;
  activate: boolean;
}

export interface SubmitSupplierRequest {
  id: string;
}

export interface SupplierIdResponse {
  supplierId: string;
}
