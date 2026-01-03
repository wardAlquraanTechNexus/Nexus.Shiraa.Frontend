import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, map } from 'rxjs';
import { Category } from '../../models/category.models';
import { CategoryService } from '../../services/category.service';
import { SelectOption } from '../../../shared/components/select-input/select-input.component';

export interface CategoryFormDialogData {
  category?: Category;
}

@Component({
  selector: 'app-category-form-dialog',
  standalone: false,
  templateUrl: './category-form-dialog.component.html',
  styleUrl: './category-form-dialog.component.scss'
})
export class CategoryFormDialogComponent implements OnInit {
  categoryForm!: FormGroup;
  parentCategoryOptions$!: Observable<SelectOption[]>;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    public dialogRef: MatDialogRef<CategoryFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CategoryFormDialogData
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadParentCategories();
    if (this.data.category) {
      this.categoryForm.patchValue(this.data.category);
    }
  }

  private initForm(): void {
    this.categoryForm = this.fb.group({
      number: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      isActive: [true],
      note: [null],
      parentCategoryId: [null]
    });
  }

  private loadParentCategories(): void {
    this.parentCategoryOptions$ = this.categoryService.getCategories({ pageSize: 100 }).pipe(
      map(response => {
        const categories = response.categories.filter(c => !c.parentCategoryId);
        // Exclude current category when editing
        const filtered = this.data.category
          ? categories.filter(c => c.id !== this.data.category!.id)
          : categories;

        return [
          { value: null, label: 'None (Root Category)' },
          ...filtered.map(cat => ({
            value: cat.id,
            label: cat.name
          }))
        ];
      })
    );
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      const formValue = this.categoryForm.value;
      if (this.data.category) {
        formValue.id = this.data.category.id;
      }
      this.dialogRef.close(formValue);
    } else {
      Object.keys(this.categoryForm.controls).forEach(key => {
        this.categoryForm.get(key)?.markAsTouched();
      });
    }
  }
}
