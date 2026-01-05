import { Component, Input, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort, Sort, SortDirection } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';

export interface TableColumn {
  key: string;
  header: string;
  type?: 'text' | 'status' | 'actions' | 'custom';
  statusActiveText?: string;
  statusInactiveText?: string;
  sortable?: boolean;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

@Component({
  selector: 'app-data-table',
  standalone: false,
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss',
})
export class DataTableComponent<T> implements AfterViewInit {
  @Input() data: T[] = [];
  @Input() columns: TableColumn[] = [];
  @Input() isLoading = false;
  @Input() noDataMessage = 'No data found';
  @Input() pagination?: PaginationInfo;
  @Input() showActions = true;
  @Input() pageSizeOptions: number[] = [5, 10, 25, 50];
  @Input() sortActive = '';
  @Input() sortDirection: SortDirection = '';

  @Output() edit = new EventEmitter<T>();
  @Output() delete = new EventEmitter<T>();
  @Output() pageChange = new EventEmitter<PageEvent>();
  @Output() sortChange = new EventEmitter<Sort>();

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    // Sort initialization if needed
  }

  get displayedColumns(): string[] {
    const cols = this.columns.map(c => c.key);
    if (this.showActions) {
      cols.push('actions');
    }
    return cols;
  }

  getValue(item: T, key: string): unknown {
    return (item as Record<string, unknown>)[key];
  }

  onEdit(item: T): void {
    this.edit.emit(item);
  }

  onDelete(item: T): void {
    this.delete.emit(item);
  }

  onPageChange(event: PageEvent): void {
    this.pageChange.emit(event);
  }

  onSortChange(sort: Sort): void {
    this.sortChange.emit(sort);
  }
}
