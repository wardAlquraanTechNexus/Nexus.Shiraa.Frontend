import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, map, of } from 'rxjs';
import { Address } from '../../models/address.models';
import { AddressService } from '../../services/address.service';
import { CountryService } from '../../services/country.service';
import { CityService } from '../../services/city.service';
import { SnackbarService } from '../../../shared/services/snackbar.service';
import { SelectOption } from '../../../shared/components/select-input/select-input.component';

export interface AddressFormDialogData {
  address?: Address;
}

@Component({
  selector: 'app-address-form-dialog',
  standalone: false,
  templateUrl: './address-form-dialog.component.html',
  styleUrl: './address-form-dialog.component.scss'
})
export class AddressFormDialogComponent implements OnInit {
  addressForm!: FormGroup;
  countryOptions$!: Observable<SelectOption[]>;
  cityOptions$: Observable<SelectOption[]> = of([]);
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private addressService: AddressService,
    private countryService: CountryService,
    private cityService: CityService,
    private snackbar: SnackbarService,
    public dialogRef: MatDialogRef<AddressFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddressFormDialogData
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadCountries();

    if (this.data.address) {
      this.addressForm.patchValue(this.data.address);
      // Load cities for the selected country when editing
      if (this.data.address.countryId) {
        this.loadCities(this.data.address.countryId);
      }
    }
  }

  private initForm(): void {
    this.addressForm = this.fb.group({
      number: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      addressLine: [null],
      isActive: [true],
      note: [null],
      countryId: [null, Validators.required],
      cityId: [null],
      supplierId: [null]
    });
  }

  private loadCountries(): void {
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

  private loadCities(countryId: string): void {
    this.cityOptions$ = this.cityService.getCitiesForCountry(countryId).pipe(
      map(cities => cities
        .filter(c => c.isActive)
        .map(city => ({
          value: city.id,
          label: city.name || ''
        }))
      )
    );
  }

  onCountryChange(countryId: string): void {
    // Reset city when country changes
    this.addressForm.get('cityId')?.setValue(null);

    if (countryId) {
      this.loadCities(countryId);
    } else {
      this.cityOptions$ = of([]);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.addressForm.valid) {
      const formValue = this.addressForm.value;
      this.isSubmitting = true;

      if (this.data.address) {
        formValue.id = this.data.address.id;
        this.addressService.update(formValue.id, formValue).subscribe({
          next: () => {
            this.snackbar.success('Address updated successfully');
            this.dialogRef.close('updated');
          },
          error: () => {
            this.isSubmitting = false;
          }
        });
      } else {
        this.addressService.create(formValue).subscribe({
          next: () => {
            this.snackbar.success('Address created successfully');
            this.dialogRef.close('created');
          },
          error: () => {
            this.isSubmitting = false;
          }
        });
      }
    } else {
      Object.keys(this.addressForm.controls).forEach(key => {
        this.addressForm.get(key)?.markAsTouched();
      });
    }
  }
}
