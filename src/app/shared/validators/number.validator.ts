import { AbstractControl } from '@angular/forms';

export class NumberValidators {
  static getErrorMessage(control: AbstractControl): string {
    if (control.hasError('required')) {
      return 'This field is required';
    }
    if (control.hasError('min')) {
      const error = control.getError('min');
      return `Value must be at least ${error.min}`;
    }
    if (control.hasError('max')) {
      const error = control.getError('max');
      return `Value must be no more than ${error.max}`;
    }
    if (control.hasError('pattern')) {
      return 'Please enter a valid number';
    }
    return '';
  }
}
