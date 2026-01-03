import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

// Input Components
import { EmailInputComponent } from './components/email-input/email-input.component';
import { PhoneInputComponent } from './components/phone-input/phone-input.component';
import { TextInputComponent } from './components/text-input/text-input.component';
import { NumberInputComponent } from './components/number-input/number-input.component';
import { ButtonComponent } from './components/button/button.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { FormCardComponent } from './components/form-card/form-card.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { SelectInputComponent } from './components/select-input/select-input.component';
import { TextareaInputComponent } from './components/textarea-input/textarea-input.component';
import { SlideToggleInputComponent } from './components/slide-toggle-input/slide-toggle-input.component';

// Pipes
import { TranslatePipe } from './pipes/translate.pipe';

@NgModule({
  declarations: [
    EmailInputComponent,
    PhoneInputComponent,
    TextInputComponent,
    NumberInputComponent,
    SelectInputComponent,
    TextareaInputComponent,
    SlideToggleInputComponent,
    ButtonComponent,
    DataTableComponent,
    FormCardComponent,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatChipsModule,
    MatProgressBarModule,
    MatGridListModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatSelectModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatSlideToggleModule,
    TranslatePipe,
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatChipsModule,
    MatProgressBarModule,
    MatGridListModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatSelectModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatSlideToggleModule,
    // Components
    EmailInputComponent,
    PhoneInputComponent,
    TextInputComponent,
    NumberInputComponent,
    SelectInputComponent,
    TextareaInputComponent,
    SlideToggleInputComponent,
    ButtonComponent,
    DataTableComponent,
    FormCardComponent,
    ConfirmDialogComponent,
    // Pipes
    TranslatePipe
  ]
})
export class SharedModule { }
