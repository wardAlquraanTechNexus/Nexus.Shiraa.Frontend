import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from '../../core/services/base.service';
import { Category, CreateCategoryRequest, UpdateCategoryRequest, CategoriesListResponse } from '../models/category.models';
import { PaginationParams } from '../../core/models/pagination.models';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService<Category, CreateCategoryRequest, UpdateCategoryRequest> {
  constructor(http: HttpClient) {
    super(http, 'Category');
  }

  getCategories(pagination?: PaginationParams): Observable<CategoriesListResponse> {
    const params = this.toHttpParams(pagination);
    return this.http.get<CategoriesListResponse>(this.baseUrl, { params });
  }

  getSubcategories(parentId: string): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/parent/${parentId}`);
  }
}
