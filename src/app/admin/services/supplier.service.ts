import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from '../../core/services/base.service';
import {
  Supplier,
  SupplierDetails,
  SupplierLov,
  CreateSupplierRequest,
  UpdateSupplierRequest,
  SuppliersListResponse,
  ChangeSupplierApprovalRequest,
  CancelSupplierRequest,
  ActivateSupplierRequest,
  SubmitSupplierRequest,
  SupplierIdResponse
} from '../models/supplier.models';
import { PaginationParams } from '../../core/models/pagination.models';

@Injectable({
  providedIn: 'root'
})
export class SupplierService extends BaseService<Supplier, CreateSupplierRequest, UpdateSupplierRequest, SuppliersListResponse> {
  constructor(http: HttpClient) {
    super(http, 'Supplier');
  }

  getActiveSuppliers(params?: PaginationParams): Observable<SuppliersListResponse> {
    const httpParams = this.toHttpParams(params);
    return this.http.get<SuppliersListResponse>(`${this.baseUrl}/GetActiveSupplier`, { params: httpParams });
  }

  getMatchingByRFxRequestId(rFxRequestId: string): Observable<SupplierLov[]> {
    return this.http.get<SupplierLov[]>(`${this.baseUrl}/GetMatchingByRFxRequestId/${rFxRequestId}`);
  }

  getDetails(id: string): Observable<SupplierDetails> {
    return this.http.get<SupplierDetails>(`${this.baseUrl}/${id}`);
  }

  getExistingUserSupplierId(userId: string): Observable<SupplierIdResponse | null> {
    return this.http.get<SupplierIdResponse | null>(`${this.baseUrl}/GetExistingUserSupplierId`, { params: { userId } });
  }

  updateApproval(request: ChangeSupplierApprovalRequest): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/UpdateSupplierApproval`, request);
  }

  cancelSupplier(request: CancelSupplierRequest): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/CancelSupplier`, request);
  }

  activateSupplier(request: ActivateSupplierRequest): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/ActivateSupplier`, request);
  }

  submitSupplier(request: SubmitSupplierRequest): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/SubmitSupplier`, request);
  }
}
