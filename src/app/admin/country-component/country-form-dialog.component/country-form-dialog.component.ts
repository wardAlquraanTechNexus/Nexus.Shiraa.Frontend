import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Country } from '../../models/country.models';

export interface CountryFormDialogData {
  country?: Country;
}

@Component({
  selector: 'app-country-form-dialog',
  standalone: false,
  templateUrl: './country-form-dialog.component.html',
  styleUrl: './country-form-dialog.component.scss'
})
export class CountryFormDialogComponent implements OnInit {
  countryForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CountryFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CountryFormDialogData
  ) {}

  ngOnInit(): void {
    this.initForm();
    if (this.data.country) {
      this.countryForm.patchValue(this.data.country);
    }
  }

  private initForm(): void {
    this.countryForm = this.fb.group({
      number: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      isActive: [true],
      note: [null]
    });
  }

  onSubmit(): void {
    if (this.countryForm.valid) {
      const formValue = this.countryForm.value;
      if (this.data.country) {
        formValue.id = this.data.country.id;
      }
      this.dialogRef.close(formValue);
    } else {
      Object.keys(this.countryForm.controls).forEach(key => {
        this.countryForm.get(key)?.markAsTouched();
      });
    }
  }
}
