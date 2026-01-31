import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PaginatedResponse, PaginationParams } from '../models/pagination.models';

export abstract class BaseService<T, TCreate = T, TUpdate = T, TList = PaginatedResponse<T>> {
  protected readonly baseUrl: string;

  constructor(
    protected http: HttpClient,
    protected endpoint: string
  ) {
    this.baseUrl = `${environment.apiUrl}/${endpoint}`;
  }

  protected toHttpParams<P extends object>(params?: P): HttpParams {
    let httpParams = new HttpParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
          httpParams = httpParams.set(key, String(value));
        }
      });
    }
    return httpParams;
  }

  getPaged(params?: PaginationParams): Observable<TList> {
    const httpParams = this.toHttpParams(params);
    return this.http.get<TList>(this.baseUrl, { params: httpParams });
  }

  get(pagination?: PaginationParams): Observable<PaginatedResponse<T>> {
    const params = this.toHttpParams(pagination);
    return this.http.get<PaginatedResponse<T>>(this.baseUrl, { params });
  }

  getById(id: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${id}`);
  }

  create(request: TCreate): Observable<string> {
    return this.http.post(this.baseUrl, request, { responseType: 'text' });
  }

  update(id: string, request: TUpdate): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${id}`, request);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
