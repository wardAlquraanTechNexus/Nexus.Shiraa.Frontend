import { Component, Input } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-email-input',
  standalone: false,
  templateUrl: './email-input.component.html',
  styleUrl: './email-input.component.scss'
})
export class EmailInputComponent {
  @Input() label: string = 'Email Address';
  @Input() placeholder: string = 'you@example.com';
  @Input() formGroup!: FormGroup;
  @Input() controlName: string = '';

  get control() {
    return this.formGroup?.get(this.controlName);
  }

  get isRequired(): boolean {
    return this.control?.hasValidator(Validators.required) ?? false;
  }
}
