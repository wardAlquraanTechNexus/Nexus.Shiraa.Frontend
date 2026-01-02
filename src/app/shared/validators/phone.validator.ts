import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class PhoneValidators {
  // Basic international phone pattern (allows +, digits, spaces, dashes, parentheses)
  static readonly PHONE_PATTERN = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,9}$/;

  // Strict patterns for specific countries
  static readonly PATTERNS = {
    US: /^(\+1)?[-.\s]?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$/,
    UK: /^(\+44)?[-.\s]?[0-9]{10,11}$/,
    SA: /^(\+966)?[-.\s]?[0-9]{9}$/,  // Saudi Arabia
    JO: /^(\+962)?[-.\s]?[0-9]{9}$/,  // Jordan
    AE: /^(\+971)?[-.\s]?[0-9]{9}$/,  // UAE
    INTERNATIONAL: /^[\+]?[0-9]{7,15}$/
  };

  static validPhone(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      // Remove all non-digit characters except + for validation
      const cleanedNumber = control.value.replace(/[^\d+]/g, '');

      // Check minimum length (7 digits for local, up to 15 for international)
      if (cleanedNumber.replace('+', '').length < 7) {
        return { phoneTooShort: { value: control.value, minLength: 7 } };
      }

      if (cleanedNumber.replace('+', '').length > 15) {
        return { phoneTooLong: { value: control.value, maxLength: 15 } };
      }

      const isValid = this.PHONE_PATTERN.test(control.value);
      return isValid ? null : { invalidPhone: { value: control.value } };
    };
  }

  static country(countryCode: keyof typeof PhoneValidators.PATTERNS): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const pattern = this.PATTERNS[countryCode];
      if (!pattern) {
        return null;
      }

      const isValid = pattern.test(control.value.replace(/\s/g, ''));
      return isValid ? null : { invalidPhoneFormat: { value: control.value, country: countryCode } };
    };
  }

  static minLength(min: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const digitsOnly = control.value.replace(/\D/g, '');
      return digitsOnly.length >= min ? null : { phoneTooShort: { value: control.value, minLength: min, actualLength: digitsOnly.length } };
    };
  }

  static maxLength(max: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const digitsOnly = control.value.replace(/\D/g, '');
      return digitsOnly.length <= max ? null : { phoneTooLong: { value: control.value, maxLength: max, actualLength: digitsOnly.length } };
    };
  }

  static getErrorMessage(control: AbstractControl): string {
    if (control.hasError('required')) {
      return 'Phone number is required';
    }
    if (control.hasError('invalidPhone')) {
      return 'Please enter a valid phone number';
    }
    if (control.hasError('phoneTooShort')) {
      const error = control.getError('phoneTooShort');
      return `Phone number must be at least ${error.minLength} digits`;
    }
    if (control.hasError('phoneTooLong')) {
      const error = control.getError('phoneTooLong');
      return `Phone number must not exceed ${error.maxLength} digits`;
    }
    if (control.hasError('invalidPhoneFormat')) {
      const error = control.getError('invalidPhoneFormat');
      return `Please enter a valid ${error.country} phone number`;
    }
    return '';
  }
}
