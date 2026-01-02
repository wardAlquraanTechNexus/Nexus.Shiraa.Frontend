import { Component, Input, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl, AbstractControl, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { PhoneValidators } from '../../validators/phone.validator';

class CustomErrorStateMatcher implements ErrorStateMatcher {
  constructor(private component: PhoneInputComponent) {}

  isErrorState(): boolean {
    return this.component.showError;
  }
}

@Component({
  selector: 'app-phone-input',
  standalone: false,
  templateUrl: './phone-input.component.html',
  styleUrl: './phone-input.component.scss'
})
export class PhoneInputComponent implements ControlValueAccessor, OnInit {
  @Input() label: string = 'Phone Number';
  @Input() placeholder: string = '+1 (555) 000-0000';
  @Input() customErrorMessage: string = '';

  value: string = '';
  disabled: boolean = false;
  touched: boolean = false;
  errorStateMatcher: ErrorStateMatcher;

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};
  control: AbstractControl | null = null;

  constructor(@Optional() @Self() private ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
    this.errorStateMatcher = new CustomErrorStateMatcher(this);
  }

  ngOnInit(): void {
    if (this.ngControl) {
      this.control = this.ngControl.control;
    }
  }

  get showError(): boolean {
    return !!(this.control?.invalid && (this.control?.touched || this.control?.dirty));
  }

  get isRequired(): boolean {
    return this.control?.hasValidator(Validators.required) ?? false;
  }

  get errorMessage(): string {
    if (this.customErrorMessage) {
      return this.customErrorMessage;
    }
    if (this.control) {
      return PhoneValidators.getErrorMessage(this.control);
    }
    return '';
  }

  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
  }

  onBlur(): void {
    this.touched = true;
    this.onTouched();
  }
}
