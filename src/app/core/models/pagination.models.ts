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

export enum SortDirection {
  Ascending = 1,
  Descending = 2
}

export interface PaginationParams {
  SearchPhrase?: string;
  PageNumber?: number;
  PageSize?: number;
  SortBy?: string;
  SortDirection?: SortDirection;
}
