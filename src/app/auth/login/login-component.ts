import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmailValidators } from '../../shared/validators/email.validator';

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
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
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
