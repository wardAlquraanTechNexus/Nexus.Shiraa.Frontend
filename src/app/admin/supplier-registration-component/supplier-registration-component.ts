import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SupplierService } from '../services/supplier.service';
import { CategoryService } from '../services/category.service';
import { CountryService } from '../services/country.service';
import { CityService } from '../services/city.service';
import { SnackbarService } from '../../shared/services/snackbar.service';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import {
  SupplierAddress,
  SupplierContact,
  SupplierFile,
  SupplierDocumentTypes,
  CreateSupplierRequest
} from '../models/supplier.models';
import { Category } from '../models/category.models';
import { Country } from '../models/country.models';
import { City } from '../models/city.models';

interface FileUpload {
  type: string;
  label: string;
  required: boolean;
  file?: SupplierFile;
}

@Component({
  selector: 'app-supplier-registration',
  standalone: false,
  templateUrl: './supplier-registration-component.html',
  styleUrl: './supplier-registration-component.scss'
})
export class SupplierRegistrationComponent implements OnInit {
  supplierForm!: FormGroup;
  isSubmitting = false;

  // Data lists
  countries: Country[] = [];
  cities: City[] = [];
  categories: Category[] = [];
  selectedCategories: Category[] = [];

  // Addresses
  addresses: SupplierAddress[] = [];

  // Contacts
  contacts: SupplierContact[] = [];

  // File uploads
  fileUploads: FileUpload[] = [
    { type: SupplierDocumentTypes.TradeLicense, label: 'Trade License', required: true },
    { type: SupplierDocumentTypes.PowerOfAttorney, label: 'Power of Attorney', required: true },
    { type: SupplierDocumentTypes.CompanyProfile, label: 'Company Profile', required: true },
    { type: SupplierDocumentTypes.VATCertificate, label: 'VAT Certificate', required: true },
    { type: SupplierDocumentTypes.ICVCertificate, label: 'ICV Certificate', required: true },
    { type: SupplierDocumentTypes.Other, label: 'Other Documents', required: false }
  ];

  private readonly maxFileSize = 5 * 1024 * 1024; // 5MB

  constructor(
    private fb: FormBuilder,
    private supplierService: SupplierService,
    private categoryService: CategoryService,
    private countryService: CountryService,
    private cityService: CityService,
    private snackbar: SnackbarService,
    private dialog: MatDialog,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadCountries();
    this.loadCategories();
    this.addDefaultContacts();
  }

  private initForm(): void {
    this.supplierForm = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(2)]],
      taxRegistrationNum: [null, [Validators.maxLength(15)]],
      website: [null],
      note: [null]
    });
  }

  private loadCountries(): void {
    this.countryService.getPaged({ PageNumber: 0, PageSize: 100 }).subscribe({
      next: (response) => {
        this.countries = response.countries;
      }
    });
  }

  private loadCategories(): void {
    this.categoryService.getPaged({ PageNumber: 0, PageSize: 100 }).subscribe({
      next: (response) => {
        this.categories = response.categories;
      }
    });
  }

  private addDefaultContacts(): void {
    this.contacts = [
      { name: '', designation: 'Sales Representative', email: '', phone: '', mobile: '', isPrimary: true },
      { name: '', designation: 'Management Representative', email: '', phone: '', mobile: '', isPrimary: false }
    ];
  }

  // Address management
  addAddress(): void {
    const newAddress: SupplierAddress = {
      name: '',
      number: '',
      addressLine: '',
      countryId: '',
      cityId: ''
    };
    this.addresses.push(newAddress);
  }

  removeAddress(index: number): void {
    const dialogData: ConfirmDialogData = {
      title: 'Remove Address',
      message: 'Are you sure you want to remove this address?',
      confirmText: 'Remove',
      cancelText: 'Cancel',
      type: 'warning'
    };

    this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: dialogData
    }).afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.addresses.splice(index, 1);
        this.snackbar.success('Address removed');
      }
    });
  }

  onCountryChange(address: SupplierAddress): void {
    address.cityId = '';
    if (address.countryId) {
      this.cityService.getCitiesForCountry(address.countryId).subscribe({
        next: (cities) => {
          // Store cities for this address
          (address as any).availableCities = cities;
          this.cdr.detectChanges();
        }
      });
    }
  }

  getAvailableCities(address: SupplierAddress): City[] {
    return (address as any).availableCities || [];
  }

  // Contact management
  addContact(): void {
    const newContact: SupplierContact = {
      name: '',
      designation: '',
      email: '',
      phone: '',
      mobile: '',
      isPrimary: false
    };
    this.contacts.push(newContact);
  }

  removeContact(index: number): void {
    if (this.contacts.length <= 2) {
      this.snackbar.error('At least 2 contacts are required');
      return;
    }

    const dialogData: ConfirmDialogData = {
      title: 'Remove Contact',
      message: 'Are you sure you want to remove this contact?',
      confirmText: 'Remove',
      cancelText: 'Cancel',
      type: 'warning'
    };

    this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: dialogData
    }).afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.contacts.splice(index, 1);
        this.snackbar.success('Contact removed');
      }
    });
  }

  // Category management
  toggleCategory(category: Category): void {
    const index = this.selectedCategories.findIndex(c => c.id === category.id);
    if (index > -1) {
      this.selectedCategories.splice(index, 1);
    } else {
      this.selectedCategories.push(category);
    }
  }

  isCategorySelected(category: Category): boolean {
    return this.selectedCategories.some(c => c.id === category.id);
  }

  removeCategory(category: Category): void {
    const index = this.selectedCategories.findIndex(c => c.id === category.id);
    if (index > -1) {
      this.selectedCategories.splice(index, 1);
    }
  }

  // File management
  onFileSelected(event: Event, fileUpload: FileUpload): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      if (file.size > this.maxFileSize) {
        this.snackbar.error('File size exceeds 5MB limit');
        return;
      }

      const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        this.snackbar.error('Only JPG, PNG and PDF files are allowed');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const base64 = (reader.result as string).split(',')[1];
        fileUpload.file = {
          name: fileUpload.type,
          fileName: file.name,
          fileDescription: fileUpload.type,
          fileExtension: '.' + file.name.split('.').pop(),
          fileContentType: file.type,
          fileSizeInBytes: file.size,
          fileData: base64
        };
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(file);
    }
  }

  removeFile(fileUpload: FileUpload): void {
    fileUpload.file = undefined;
  }

  // Validation
  private validateAddresses(): boolean {
    if (this.addresses.length === 0) {
      this.snackbar.error('Please add at least one address');
      return false;
    }

    for (const address of this.addresses) {
      if (!address.name || !address.countryId || !address.cityId) {
        this.snackbar.error('Please fill all required address fields');
        return false;
      }
    }
    return true;
  }

  private validateContacts(): boolean {
    if (this.contacts.length < 2) {
      this.snackbar.error('At least 2 contacts are required');
      return false;
    }

    for (const contact of this.contacts) {
      if (!contact.name || !contact.designation || !contact.email || !contact.phone || !contact.mobile) {
        this.snackbar.error('Please fill all required contact fields');
        return false;
      }
    }
    return true;
  }

  private validateCategories(): boolean {
    if (this.selectedCategories.length === 0) {
      this.snackbar.error('Please select at least one category');
      return false;
    }
    return true;
  }

  private validateFiles(): boolean {
    for (const fileUpload of this.fileUploads) {
      if (fileUpload.required && !fileUpload.file) {
        this.snackbar.error(`Please upload ${fileUpload.label}`);
        return false;
      }
    }
    return true;
  }

  // Submit
  onSubmit(): void {
    if (!this.supplierForm.valid) {
      Object.keys(this.supplierForm.controls).forEach(key => {
        this.supplierForm.get(key)?.markAsTouched();
      });
      this.snackbar.error('Please fill all required fields');
      return;
    }

    if (!this.validateAddresses() || !this.validateContacts() || !this.validateCategories() || !this.validateFiles()) {
      return;
    }

    const dialogData: ConfirmDialogData = {
      title: 'Submit Supplier Registration',
      message: 'Are you sure you want to submit this supplier registration? This will start the approval workflow.',
      confirmText: 'Submit',
      cancelText: 'Cancel',
      type: 'info'
    };

    this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: dialogData
    }).afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.submitForm();
      }
    });
  }

  private submitForm(): void {
    this.isSubmitting = true;

    const formValue = this.supplierForm.value;
    const request: CreateSupplierRequest = {
      name: formValue.name,
      taxRegistrationNum: formValue.taxRegistrationNum,
      website: formValue.website,
      note: formValue.note,
      isActive: true,
      addresses: this.addresses,
      contacts: this.contacts,
      supplierCategories: this.selectedCategories.map(c => ({ categoryId: c.id })),
      supplierFiles: this.fileUploads
        .filter(f => f.file)
        .map(f => f.file!)
    };

    this.supplierService.create(request).subscribe({
      next: () => {
        this.snackbar.success('Supplier registration submitted successfully!');
        this.router.navigate(['/admin/suppliers']);
      },
      error: () => {
        this.isSubmitting = false;
        this.cdr.detectChanges();
      }
    });
  }
}
