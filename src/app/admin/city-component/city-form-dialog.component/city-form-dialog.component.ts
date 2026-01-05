import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { City } from '../../models/city.models';

export interface CityFormDialogData {
  city?: City;
  countryId: string;
}

@Component({
  selector: 'app-city-form-dialog',
  standalone: false,
  templateUrl: './city-form-dialog.component.html',
  styleUrl: './city-form-dialog.component.scss'
})
export class CityFormDialogComponent implements OnInit {
  cityForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CityFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CityFormDialogData
  ) {}

  ngOnInit(): void {
    this.initForm();
    if (this.data.city) {
      this.cityForm.patchValue(this.data.city);
    }
  }

  private initForm(): void {
    this.cityForm = this.fb.group({
      number: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      isActive: [true],
      note: [null]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.cityForm.valid) {
      const formValue = this.cityForm.value;
      if (this.data.city) {
        formValue.id = this.data.city.id;
      }
      formValue.countryId = this.data.countryId;
      this.dialogRef.close(formValue);
    } else {
      Object.keys(this.cityForm.controls).forEach(key => {
        this.cityForm.get(key)?.markAsTouched();
      });
    }
  }
}
