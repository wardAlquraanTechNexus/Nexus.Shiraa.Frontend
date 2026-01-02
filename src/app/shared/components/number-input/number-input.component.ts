import { Component, Input } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-number-input',
  standalone: false,
  templateUrl: './number-input.component.html',
  styleUrl: './number-input.component.scss'
})
export class NumberInputComponent {
  @Input() label: string = '';
  @Input() placeholder: string = '0';
  @Input() icon: string = '';
  @Input() min: number | null = null;
  @Input() max: number | null = null;
  @Input() step: number = 1;
  @Input() formGroup!: FormGroup;
  @Input() controlName: string = '';

  get control() {
    return this.formGroup?.get(this.controlName);
  }

  get isRequired(): boolean {
    return this.control?.hasValidator(Validators.required) ?? false;
  }
}
