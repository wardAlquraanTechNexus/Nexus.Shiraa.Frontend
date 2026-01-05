import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of, map } from 'rxjs';
import { CityService } from '../services/city.service';
import { CountryService } from '../services/country.service';
import { City } from '../models/city.models';
import { SnackbarService } from '../../shared/services/snackbar.service';
import { TableColumn, PaginationInfo } from '../../shared/components/data-table/data-table.component';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { CityFormDialogComponent, CityFormDialogData } from './city-form-dialog.component/city-form-dialog.component';
import { SelectOption } from '../../shared/components/select-input/select-input.component';

@Component({
  selector: 'app-city',
  standalone: false,
  templateUrl: './city-component.html',
  styleUrl: './city-component.scss',
})
export class CityComponent implements OnInit {
  cities: City[] = [];
  isLoading = false;
  selectedCountryId: string | null = null;
  countryOptions$: Observable<SelectOption[]> = of([]);
  filterForm!: FormGroup;

  // Table columns
  tableColumns: TableColumn[] = [
    { key: 'number', header: 'Number', sortable: true },
    { key: 'name', header: 'Name', sortable: true },
    { key: 'isActive', header: 'Status', type: 'status', sortable: true }
  ];

  // Pagination info
  pagination: PaginationInfo = {
    currentPage: 0,
    totalCount: 0,
    totalPages: 0,
    pageSize: 10,
    hasNext: false,
    hasPrevious: false
  };

  constructor(
    private fb: FormBuilder,
    private cityService: CityService,
    private countryService: CountryService,
    private snackbar: SnackbarService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.initFilterForm();
    this.loadCountries();
  }

  private initFilterForm(): void {
    this.filterForm = this.fb.group({
      countryId: [null]
    });
  }

  loadCountries(): void {
    this.countryOptions$ = this.countryService.getPaged({ PageSize: 100 }).pipe(
      map(response => response.countries
        .filter(c => c.isActive)
        .map(country => ({
          value: country.id,
          label: country.name || ''
        }))
      )
    );
  }

  onCountryChange(countryId: string): void {
    this.selectedCountryId = countryId;
    this.pagination.currentPage = 0;
    if (countryId) {
      this.loadCities();
    } else {
      this.cities = [];
    }
  }

  loadCities(): void {
    if (!this.selectedCountryId) {
      return;
    }

    this.isLoading = true;
    this.cityService.getCitiesForCountry(this.selectedCountryId).subscribe({
      next: (cities) => {
        this.cities = cities;
        this.pagination = {
          currentPage: 0,
          totalCount: cities.length,
          totalPages: 1,
          pageSize: cities.length,
          hasNext: false,
          hasPrevious: false
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
    this.loadCities();
  }

  openFormDialog(city?: City): void {
    if (!this.selectedCountryId) {
      this.snackbar.warning('Please select a country first');
      return;
    }

    const dialogData: CityFormDialogData = {
      city: city,
      countryId: this.selectedCountryId
    };

    this.dialog.open(CityFormDialogComponent, {
      width: '600px',
      maxWidth: '90vw',
      disableClose: true,
      data: dialogData
    }).afterClosed().subscribe(result => {
      if (result) {
        if (city) {
          this.updateCity(result);
        } else {
          this.createCity(result);
        }
      }
    });
  }

  private createCity(data: any): void {
    if (!this.selectedCountryId) return;

    this.isLoading = true;
    this.cityService.create(this.selectedCountryId, data).subscribe({
      next: () => {
        this.snackbar.success('City created successfully');
        this.loadCities();
      },
      error: () => {
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  private updateCity(data: any): void {
    if (!this.selectedCountryId) return;

    this.isLoading = true;
    this.cityService.update(this.selectedCountryId, data.id, data).subscribe({
      next: () => {
        this.snackbar.success('City updated successfully');
        this.loadCities();
      },
      error: () => {
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  editCity(city: City): void {
    this.openFormDialog(city);
  }

  deleteCity(city: City): void {
    if (!this.selectedCountryId) return;

    const dialogData: ConfirmDialogData = {
      title: 'Delete City',
      message: `Are you sure you want to delete "${city.name}"? This action cannot be undone.`,
      confirmText: 'Delete',
      cancelText: 'Cancel',
      type: 'danger'
    };

    this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: dialogData
    }).afterClosed().subscribe(confirmed => {
      if (confirmed && this.selectedCountryId) {
        this.isLoading = true;
        this.cityService.delete(this.selectedCountryId, city.id).subscribe({
          next: () => {
            this.snackbar.success('City deleted successfully');
            this.loadCities();
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
    // Client-side sorting since API returns all cities for a country
    if (sort.active && sort.direction) {
      this.cities = [...this.cities].sort((a, b) => {
        const aValue = (a as any)[sort.active] ?? '';
        const bValue = (b as any)[sort.active] ?? '';
        const comparison = aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        return sort.direction === 'asc' ? comparison : -comparison;
      });
    }
  }
}
