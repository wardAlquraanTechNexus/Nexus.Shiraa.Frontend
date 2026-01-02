import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class EmailValidators {
  static readonly EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;



  static getErrorMessage(control: AbstractControl): string {
    if (control.hasError('required')) {
      return 'Email is required';
    }

    if (control.hasError('email')) {
      return 'Please enter a valid email address';
    }
    if (control.hasError('invalidDomain')) {
      const error = control.getError('invalidDomain');
      return `Email domain must be one of: ${error.allowedDomains.join(', ')}`;
    }
    if (control.hasError('blockedDomain')) {
      return 'This email domain is not allowed';
    }
    return '';
  }
}
