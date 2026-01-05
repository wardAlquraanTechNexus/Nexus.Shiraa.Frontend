import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Supplier } from '../../models/supplier.models';
import { SupplierService } from '../../services/supplier.service';
import { SnackbarService } from '../../../shared/services/snackbar.service';

export interface SupplierFormDialogData {
  supplier?: Supplier;
}

@Component({
  selector: 'app-supplier-form-dialog',
  standalone: false,
  templateUrl: './supplier-form-dialog.component.html',
  styleUrl: './supplier-form-dialog.component.scss'
})
export class SupplierFormDialogComponent implements OnInit {
  supplierForm!: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private supplierService: SupplierService,
    private snackbar: SnackbarService,
    public dialogRef: MatDialogRef<SupplierFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SupplierFormDialogData
  ) {}

  ngOnInit(): void {
    this.initForm();
    if (this.data.supplier) {
      this.supplierForm.patchValue(this.data.supplier);
    }
  }

  private initForm(): void {
    this.supplierForm = this.fb.group({
      number: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      isActive: [true],
      note: [null],
      taxRegistrationNum: [null],
      commercialLicenseNum: [null],
      website: [null]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.supplierForm.valid) {
      const formValue = this.supplierForm.value;
      this.isSubmitting = true;

      if (this.data.supplier) {
        formValue.id = this.data.supplier.id;
        this.supplierService.update(formValue.id, formValue).subscribe({
          next: () => {
            this.snackbar.success('Supplier updated successfully');
            this.dialogRef.close('updated');
          },
          error: () => {
            this.isSubmitting = false;
          }
        });
      } else {
        this.supplierService.create(formValue).subscribe({
          next: () => {
            this.snackbar.success('Supplier created successfully');
            this.dialogRef.close('created');
          },
          error: () => {
            this.isSubmitting = false;
          }
        });
      }
    } else {
      Object.keys(this.supplierForm.controls).forEach(key => {
        this.supplierForm.get(key)?.markAsTouched();
      });
    }
  }
}
