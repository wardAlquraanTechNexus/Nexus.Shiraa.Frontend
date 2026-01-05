import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort, SortDirection as MatSortDirection } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { CountryService } from '../services/country.service';
import { Country, CreateCountryRequest, UpdateCountryRequest } from '../models/country.models';
import { SnackbarService } from '../../shared/services/snackbar.service';
import { TableColumn, PaginationInfo } from '../../shared/components/data-table/data-table.component';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { CountryFormDialogComponent, CountryFormDialogData } from './country-form-dialog.component/country-form-dialog.component';
import { SortDirection } from '../../core/models/pagination.models';

@Component({
  selector: 'app-country',
  standalone: false,
  templateUrl: './country-component.html',
  styleUrl: './country-component.scss',
})
export class CountryComponent implements OnInit {
  countries: Country[] = [];
  isLoading = false;
  searchPhrase = '';
  sortBy?: string;
  sortDirection?: SortDirection;
  matSortDirection: MatSortDirection = '';

  // Table columns
  tableColumns: TableColumn[] = [
    { key: 'number', header: 'Number', sortable: true },
    { key: 'name', header: 'Name', sortable: true },
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
    private countryService: CountryService,
    private snackbar: SnackbarService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadCountries();
  }

  loadCountries(): void {
    this.isLoading = true;
    this.countryService.getPaged({
      PageNumber: this.pagination.currentPage,
      PageSize: this.pagination.pageSize,
      SearchPhrase: this.searchPhrase || undefined,
      SortBy: this.sortBy,
      SortDirection: this.sortDirection
    }).subscribe({
      next: (response) => {
        this.countries = response.countries;
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
    this.loadCountries();
  }

  openFormDialog(country?: Country): void {
    const dialogData: CountryFormDialogData = {
      country: country
    };

    this.dialog.open(CountryFormDialogComponent, {
      width: '800px',
      maxWidth: '90vw',
      disableClose: true,
      data: dialogData
    }).afterClosed().subscribe(result => {
      if (result) {
        if (country) {
          this.updateCountry(result);
        } else {
          this.createCountry(result);
        }
      }
    });
  }

  private createCountry(data: CreateCountryRequest): void {
    this.isLoading = true;
    this.countryService.create(data).subscribe({
      next: () => {
        this.snackbar.success('Country created successfully');
        this.loadCountries();
      },
      error: () => {
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  private updateCountry(data: UpdateCountryRequest): void {
    this.isLoading = true;
    this.countryService.update(data.id, data).subscribe({
      next: () => {
        this.snackbar.success('Country updated successfully');
        this.loadCountries();
      },
      error: () => {
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  editCountry(country: Country): void {
    this.openFormDialog(country);
  }

  deleteCountry(country: Country): void {
    const dialogData: ConfirmDialogData = {
      title: 'Delete Country',
      message: `Are you sure you want to delete "${country.name}"? This action cannot be undone.`,
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
        this.countryService.delete(country.id).subscribe({
          next: () => {
            this.snackbar.success('Country deleted successfully');
            this.loadCountries();
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
    this.loadCountries();
  }

  onSearch(searchPhrase: string): void {
    this.searchPhrase = searchPhrase;
    this.pagination.currentPage = 0;
    this.loadCountries();
  }
}
