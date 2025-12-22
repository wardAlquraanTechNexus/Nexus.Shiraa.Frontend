import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';

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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      terms: [false, [Validators.requiredTrue]]
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

  getFullNameErrorMessage(): string {
    const fullNameControl = this.registerForm.get('fullName');
    if (fullNameControl?.hasError('required')) {
      return 'Full name is required';
    }
    if (fullNameControl?.hasError('minlength')) {
      return 'Full name must be at least 3 characters';
    }
    return '';
  }

  getEmailErrorMessage(): string {
    const emailControl = this.registerForm.get('email');
    if (emailControl?.hasError('required')) {
      return 'Email is required';
    }
    if (emailControl?.hasError('email')) {
      return 'Please enter a valid email address';
    }
    return '';
  }

  getPasswordErrorMessage(): string {
    const passwordControl = this.registerForm.get('password');
    if (passwordControl?.hasError('required')) {
      return 'Password is required';
    }
    if (passwordControl?.hasError('minlength')) {
      return 'Password must be at least 8 characters';
    }
    return '';
  }

  getConfirmPasswordErrorMessage(): string {
    const confirmPasswordControl = this.registerForm.get('confirmPassword');
    if (confirmPasswordControl?.hasError('required')) {
      return 'Please confirm your password';
    }
    if (this.registerForm.hasError('passwordMismatch') && confirmPasswordControl?.touched) {
      return 'Passwords do not match';
    }
    return '';
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      console.log('Register form submitted:', this.registerForm.value);

      // Simulate API call
      setTimeout(() => {
        this.isLoading = false;
        // Navigate to admin dashboard on success
        this.router.navigate(['/admin']);
      }, 1500);
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.registerForm.controls).forEach(key => {
        this.registerForm.get(key)?.markAsTouched();
      });
    }
  }

  onGoogleRegister(): void {
    console.log('Google register clicked');
    // Implement Google OAuth registration
  }

  onGithubRegister(): void {
    console.log('GitHub register clicked');
    // Implement GitHub OAuth registration
  }
}
