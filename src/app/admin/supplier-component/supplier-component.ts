import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort, SortDirection as MatSortDirection } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { SupplierService } from '../services/supplier.service';
import { Supplier } from '../models/supplier.models';
import { SnackbarService } from '../../shared/services/snackbar.service';
import { TableColumn, PaginationInfo } from '../../shared/components/data-table/data-table.component';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { SupplierFormDialogComponent, SupplierFormDialogData } from './supplier-form-dialog.component/supplier-form-dialog.component';
import { SortDirection } from '../../core/models/pagination.models';

@Component({
  selector: 'app-supplier',
  standalone: false,
  templateUrl: './supplier-component.html',
  styleUrl: './supplier-component.scss',
})
export class SupplierComponent implements OnInit {
  suppliers: Supplier[] = [];
  isLoading = false;
  searchPhrase = '';
  sortBy?: string;
  sortDirection?: SortDirection;
  matSortDirection: MatSortDirection = '';

  // Table columns
  tableColumns: TableColumn[] = [
    { key: 'number', header: 'Number', sortable: true },
    { key: 'name', header: 'Name', sortable: true },
    { key: 'taxRegistrationNum', header: 'Tax Reg. No.', sortable: true },
    { key: 'commercialLicenseNum', header: 'Commercial License', sortable: true },
    { key: 'isActive', header: 'Status', type: 'status', sortable: true }
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
    private supplierService: SupplierService,
    private snackbar: SnackbarService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadSuppliers();
  }

  loadSuppliers(): void {
    this.isLoading = true;
    this.supplierService.getPaged({
      PageNumber: this.pagination.currentPage,
      PageSize: this.pagination.pageSize,
      SearchPhrase: this.searchPhrase || undefined,
      SortBy: this.sortBy,
      SortDirection: this.sortDirection
    }).subscribe({
      next: (response) => {
        this.suppliers = response.suppliers;
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
    this.loadSuppliers();
  }

  openFormDialog(supplier?: Supplier): void {
    const dialogData: SupplierFormDialogData = {
      supplier: supplier
    };

    this.dialog.open(SupplierFormDialogComponent, {
      width: '800px',
      maxWidth: '90vw',
      disableClose: true,
      data: dialogData
    }).afterClosed().subscribe(result => {
      if (result === 'created' || result === 'updated') {
        this.loadSuppliers();
      }
    });
  }

  editSupplier(supplier: Supplier): void {
    this.openFormDialog(supplier);
  }

  deleteSupplier(supplier: Supplier): void {
    const dialogData: ConfirmDialogData = {
      title: 'Delete Supplier',
      message: `Are you sure you want to delete "${supplier.name}"? This action cannot be undone.`,
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
        this.supplierService.delete(supplier.id).subscribe({
          next: () => {
            this.snackbar.success('Supplier deleted successfully');
            this.loadSuppliers();
          },
          error: () => {
            this.isLoading = false;
            this.cdr.detectChanges();
          }
        });
      }
    });
  }

  activateSupplier(supplier: Supplier, activate: boolean): void {
    const action = activate ? 'activate' : 'deactivate';
    const dialogData: ConfirmDialogData = {
      title: `${activate ? 'Activate' : 'Deactivate'} Supplier`,
      message: `Are you sure you want to ${action} "${supplier.name}"?`,
      confirmText: activate ? 'Activate' : 'Deactivate',
      cancelText: 'Cancel',
      type: activate ? 'info' : 'warning'
    };

    this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: dialogData
    }).afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.isLoading = true;
        this.supplierService.activateSupplier({ id: supplier.id, activate }).subscribe({
          next: () => {
            this.snackbar.success(`Supplier ${action}d successfully`);
            this.loadSuppliers();
          },
          error: () => {
            this.isLoading = false;
            this.cdr.detectChanges();
          }
        });
      }
    });
  }

  onSortChange(sort: Sort): void {
    const newSortBy = sort.active || undefined;

    // Ignore if sort hasn't actually changed (prevents double API call on init)
    if (this.sortBy === newSortBy && this.matSortDirection === sort.direction) {
      return;
    }

    this.sortBy = newSortBy;
    this.matSortDirection = sort.direction;
    if (sort.direction === 'asc') {
      this.sortDirection = SortDirection.Ascending;
    } else if (sort.direction === 'desc') {
      this.sortDirection = SortDirection.Descending;
    } else {
      this.sortDirection = undefined;
    }
    this.pagination.currentPage = 0;
    this.loadSuppliers();
  }

  onSearch(searchPhrase: string): void {
    this.searchPhrase = searchPhrase;
    this.pagination.currentPage = 0;
    this.loadSuppliers();
  }
}
