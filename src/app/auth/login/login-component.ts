import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login-component.html',
  styleUrl: './login-component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  hidePassword = true;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  getEmailErrorMessage(): string {
    const emailControl = this.loginForm.get('email');
    if (emailControl?.hasError('required')) {
      return 'Email is required';
    }
    if (emailControl?.hasError('email')) {
      return 'Please enter a valid email address';
    }
    return '';
  }

  getPasswordErrorMessage(): string {
    const passwordControl = this.loginForm.get('password');
    if (passwordControl?.hasError('required')) {
      return 'Password is required';
    }
    if (passwordControl?.hasError('minlength')) {
      return 'Password must be at least 6 characters';
    }
    return '';
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      console.log('Login form submitted:', this.loginForm.value);

      // Simulate API call
      setTimeout(() => {
        this.isLoading = false;
        // Navigate to admin dashboard on success
        this.router.navigate(['/admin']);
      }, 1500);
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.loginForm.controls).forEach(key => {
        this.loginForm.get(key)?.markAsTouched();
      });
    }
  }

  onGoogleLogin(): void {
    console.log('Google login clicked');
    // Implement Google OAuth login
  }

  onGithubLogin(): void {
    console.log('GitHub login clicked');
    // Implement GitHub OAuth login
  }
}
