import { Component, Input } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-phone-input',
  standalone: false,
  templateUrl: './phone-input.component.html',
  styleUrl: './phone-input.component.scss'
})
export class PhoneInputComponent {
  @Input() label: string = 'Phone Number';
  @Input() placeholder: string = 'Enter your phone number';
  @Input() formGroup!: FormGroup;
  @Input() controlName: string = '';

  get control() {
    return this.formGroup?.get(this.controlName);
  }

  get isRequired(): boolean {
    return this.control?.hasValidator(Validators.required) ?? false;
  }
}
