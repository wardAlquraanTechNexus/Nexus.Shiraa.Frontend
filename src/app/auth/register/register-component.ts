import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { PhoneValidators } from '../../shared/validators/phone.validator';
import { AuthService } from '../services/auth.service';
import { RegistrationRequest } from '../models/auth.models';
import { SnackbarService } from '../../shared/services/snackbar.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register-component.html',
  styleUrl: './register-component.scss',
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private snackbar: SnackbarService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: [null, [Validators.required, Validators.minLength(2)]],
      lastName: [null],
      email: [null, [Validators.required, Validators.email]],
      phoneNumber: [null, [PhoneValidators.validPhone()]],
      password: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(25)]],
      confirmPassword: [null, [Validators.required]],
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (!password || !confirmPassword) {
      return null;
    }

    return password.value === confirmPassword.value ? null : { passwordMismatch: true };
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;

      const email = this.registerForm.value.email;
      const request: RegistrationRequest = {
        firstName: this.registerForm.value.firstName,
        lastName: this.registerForm.value.lastName,
        email: email,
        userName: email,
        phoneNumber: this.registerForm.value.phoneNumber,
        password: this.registerForm.value.password
      };

      this.authService.register(request).subscribe({
        next: () => {
          this.isLoading = false;
          this.cdr.detectChanges();
          this.snackbar.success('Registration successful! Please sign in.');
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.isLoading = false;
          this.cdr.detectChanges();
        }
      });
    } else {
      Object.keys(this.registerForm.controls).forEach(key => {
        this.registerForm.get(key)?.markAsTouched();
      });
    }
  }
}
