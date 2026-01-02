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

// Input Components
import { EmailInputComponent } from './components/email-input/email-input.component';
import { PhoneInputComponent } from './components/phone-input/phone-input.component';
import { TextInputComponent } from './components/text-input/text-input.component';
import { NumberInputComponent } from './components/number-input/number-input.component';
import { ButtonComponent } from './components/button/button.component';

@NgModule({
  declarations: [
    EmailInputComponent,
    PhoneInputComponent,
    TextInputComponent,
    NumberInputComponent,
    ButtonComponent
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
    // Components
    EmailInputComponent,
    PhoneInputComponent,
    TextInputComponent,
    NumberInputComponent,
    ButtonComponent
  ]
})
export class SharedModule { }
