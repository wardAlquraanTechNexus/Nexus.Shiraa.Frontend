import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from '../../core/services/base.service';
import { Category, CreateCategoryRequest, UpdateCategoryRequest, CategoriesListResponse } from '../models/category.models';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService<Category, CreateCategoryRequest, UpdateCategoryRequest, CategoriesListResponse> {
  constructor(http: HttpClient) {
    super(http, 'Category');
  }

  getSubcategories(parentId: string): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/parent/${parentId}`);
  }
}
