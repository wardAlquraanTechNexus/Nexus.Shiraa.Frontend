export interface PaginatedResponse<T> {
  items: T[];
  totalPages: number;
  totalCount: number;
  itemsFrom: number;
  itemsTo: number;
  currentPage: number;
  hasPrivious: boolean;
  hasNext: boolean;
}

export interface PaginationParams {
  pageNumber?: number;
  pageSize?: number;
  searchTerm?: string;
}
