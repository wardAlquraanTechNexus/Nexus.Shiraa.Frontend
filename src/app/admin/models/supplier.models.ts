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
}

export interface SupplierDetails extends Supplier {
  // Extended details can be added here
}

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
