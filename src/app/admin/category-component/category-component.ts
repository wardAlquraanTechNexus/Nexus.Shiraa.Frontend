import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { CategoryService } from '../services/category.service';
import { Category, CreateCategoryRequest, UpdateCategoryRequest } from '../models/category.models';
import { SnackbarService } from '../../shared/services/snackbar.service';
import { TableColumn, PaginationInfo } from '../../shared/components/data-table/data-table.component';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { CategoryFormDialogComponent, CategoryFormDialogData } from './category-form-dialog.component/category-form-dialog.component';

@Component({
  selector: 'app-category',
  standalone: false,
  templateUrl: './category-component.html',
  styleUrl: './category-component.scss',
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  isLoading = false;

  // Table columns
  tableColumns: TableColumn[] = [
    { key: 'number', header: 'Number' },
    { key: 'name', header: 'Name' },
    { key: 'isActive', header: 'Status', type: 'status' }
  ];

  // Pagination info from API
  pagination: PaginationInfo = {
    currentPage: 0,
    totalCount: 0,
    totalPages: 0,
    pageSize: 10,
    hasNext: false,
    hasPrevious: false
  };

  constructor(
    private categoryService: CategoryService,
    private snackbar: SnackbarService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.isLoading = true;
    this.categoryService.getCategories({ pageNumber: this.pagination.currentPage, pageSize: this.pagination.pageSize }).subscribe({
      next: (response) => {
        this.categories = response.categories;
        this.pagination = {
          currentPage: response.currentPage,
          totalCount: response.totalCount,
          totalPages: response.totalPages,
          pageSize: this.pagination.pageSize,
          hasNext: response.hasNext,
          hasPrevious: response.hasPrivious
        };
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.isLoading = false;
        this.cdr.markForCheck();
      }
    });
  }

  onPageChange(event: PageEvent): void {
    this.pagination.currentPage = event.pageIndex;
    this.pagination.pageSize = event.pageSize;
    this.loadCategories();
  }

  openFormDialog(category?: Category): void {
    const dialogData: CategoryFormDialogData = {
      category: category
    };

    this.dialog.open(CategoryFormDialogComponent, {
      width: '800px',
      maxWidth: '90vw',
      disableClose: true,
      data: dialogData
    }).afterClosed().subscribe(result => {
      if (result) {
        if (category) {
          this.updateCategory(result);
        } else {
          this.createCategory(result);
        }
      }
    });
  }

  private createCategory(data: CreateCategoryRequest): void {
    this.isLoading = true;
    this.categoryService.create(data).subscribe({
      next: () => {
        this.snackbar.success('Category created successfully');
        this.loadCategories();
      },
      error: () => {
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  private updateCategory(data: UpdateCategoryRequest): void {
    this.isLoading = true;
    this.categoryService.update(data.id, data).subscribe({
      next: () => {
        this.snackbar.success('Category updated successfully');
        this.loadCategories();
      },
      error: () => {
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  editCategory(category: Category): void {
    this.openFormDialog(category);
  }

  deleteCategory(category: Category): void {
    const dialogData: ConfirmDialogData = {
      title: 'Delete Category',
      message: `Are you sure you want to delete "${category.name}"? This action cannot be undone.`,
      confirmText: 'Delete',
      cancelText: 'Cancel',
      type: 'danger'
    };

    this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: dialogData
    }).afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.isLoading = true;
        this.categoryService.delete(category.id).subscribe({
          next: () => {
            this.snackbar.success('Category deleted successfully');
            this.loadCategories();
          },
          error: () => {
            this.isLoading = false;
            this.cdr.detectChanges();
          }
        });
      }
    });
  }
}
