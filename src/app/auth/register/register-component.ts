import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { EmailValidators } from '../../shared/validators/email.validator';

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
      fullName: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, [Validators.required]],
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
