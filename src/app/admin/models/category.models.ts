export interface Category {
  id: string;
  number?: string;
  name: string;
  isActive: boolean;
  note?: string;
  parentCategoryId?: string;
}

export interface CreateCategoryRequest {
  number?: string;
  name: string;
  isActive: boolean;
  note?: string;
  parentCategoryId?: string;
}

export interface UpdateCategoryRequest {
  id:string;
  number?: string;
  name: string;
  isActive: boolean;
  note?: string;
  parentCategoryId?: string;
}

export interface CategoriesListResponse {
  categories: Category[];
  totalPages: number;
  totalCount: number;
  itemsFrom: number;
  itemsTo: number;
  currentPage: number;
  hasPrivious: boolean;
  hasNext: boolean;
}
