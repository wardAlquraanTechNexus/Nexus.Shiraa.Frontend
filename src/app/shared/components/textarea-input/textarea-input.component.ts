import { Component, Input } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-textarea-input',
  standalone: false,
  templateUrl: './textarea-input.component.html',
  styleUrl: './textarea-input.component.scss'
})
export class TextareaInputComponent {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() icon: string = '';
  @Input() rows: number = 3;
  @Input() formGroup!: FormGroup;
  @Input() controlName: string = '';

  get control() {
    return this.formGroup?.get(this.controlName);
  }

  get isRequired(): boolean {
    return this.control?.hasValidator(Validators.required) ?? false;
  }
}
