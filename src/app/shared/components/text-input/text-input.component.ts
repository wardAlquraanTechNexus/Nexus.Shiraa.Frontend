import { Component, Input } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  standalone: false,
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss'
})
export class TextInputComponent {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() icon: string = '';
  @Input() autocomplete: string = 'off';
  @Input() formGroup!: FormGroup;
  @Input() controlName: string = '';

  get control() {
    return this.formGroup?.get(this.controlName);
  }

  get isRequired(): boolean {
    return this.control?.hasValidator(Validators.required) ?? false;
  }
}
