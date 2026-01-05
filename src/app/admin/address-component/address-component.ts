import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort, SortDirection as MatSortDirection } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AddressService } from '../services/address.service';
import { Address } from '../models/address.models';
import { SnackbarService } from '../../shared/services/snackbar.service';
import { TableColumn, PaginationInfo } from '../../shared/components/data-table/data-table.component';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { AddressFormDialogComponent, AddressFormDialogData } from './address-form-dialog.component/address-form-dialog.component';
import { SortDirection } from '../../core/models/pagination.models';

@Component({
  selector: 'app-address',
  standalone: false,
  templateUrl: './address-component.html',
  styleUrl: './address-component.scss',
})
export class AddressComponent implements OnInit {
  addresses: Address[] = [];
  isLoading = false;
  searchPhrase = '';
  sortBy?: string;
  sortDirection?: SortDirection;
  matSortDirection: MatSortDirection = '';

  // Table columns
  tableColumns: TableColumn[] = [
    { key: 'number', header: 'Number', sortable: true },
    { key: 'name', header: 'Name', sortable: true },
    { key: 'addressLine', header: 'Address Line', sortable: true },
    { key: 'countryName', header: 'Country', sortable: true },
    { key: 'cityName', header: 'City', sortable: true },
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
    private addressService: AddressService,
    private snackbar: SnackbarService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadAddresses();
  }

  loadAddresses(): void {
    this.isLoading = true;
    this.addressService.getPaged({
      PageNumber: this.pagination.currentPage,
      PageSize: this.pagination.pageSize,
      SearchPhrase: this.searchPhrase || undefined,
      SortBy: this.sortBy,
      SortDirection: this.sortDirection
    }).subscribe({
      next: (response) => {
        this.addresses = response.addresses;
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
    this.loadAddresses();
  }

  openFormDialog(address?: Address): void {
    const dialogData: AddressFormDialogData = {
      address: address
    };

    this.dialog.open(AddressFormDialogComponent, {
      width: '800px',
      maxWidth: '90vw',
      disableClose: true,
      data: dialogData
    }).afterClosed().subscribe(result => {
      if (result === 'created' || result === 'updated') {
        this.loadAddresses();
      }
    });
  }

  editAddress(address: Address): void {
    this.openFormDialog(address);
  }

  deleteAddress(address: Address): void {
    const dialogData: ConfirmDialogData = {
      title: 'Delete Address',
      message: `Are you sure you want to delete "${address.name}"? This action cannot be undone.`,
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
        this.addressService.delete(address.id).subscribe({
          next: () => {
            this.snackbar.success('Address deleted successfully');
            this.loadAddresses();
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
    this.loadAddresses();
  }

  onSearch(searchPhrase: string): void {
    this.searchPhrase = searchPhrase;
    this.pagination.currentPage = 0;
    this.loadAddresses();
  }
}
