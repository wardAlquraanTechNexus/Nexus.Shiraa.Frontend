import { AbstractControl } from '@angular/forms';

export class TextValidators {
  static getErrorMessage(control: AbstractControl): string {
    if (control.hasError('required')) {
      return 'This field is required';
    }
    if (control.hasError('minlength')) {
      const error = control.getError('minlength');
      return `Must be at least ${error.requiredLength} characters`;
    }
    if (control.hasError('maxlength')) {
      const error = control.getError('maxlength');
      return `Must be no more than ${error.requiredLength} characters`;
    }
    if (control.hasError('pattern')) {
      return 'Invalid format';
    }
    return '';
  }
}
