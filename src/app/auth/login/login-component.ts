import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthRequest } from '../models/auth.models';
import { SnackbarService } from '../../shared/services/snackbar.service';
import { StorageService } from '../../core/services/storage.service';

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
    private router: Router,
    private authService: AuthService,
    private snackbar: SnackbarService,
    private cdr: ChangeDetectorRef,
    private storage: StorageService
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

      const request: AuthRequest = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };

      this.authService.login(request).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.cdr.detectChanges();

          // Store auth data
          this.storage.setToken(response.token);
          this.storage.setUser({
            id: response.id,
            userName: response.userName,
            email: response.email,
            firstName: response.firstName,
            lastName: response.lastName
          });

          this.snackbar.success('Login successful!');
          this.router.navigate(['/admin']);
        },
        error: (error) => {
          this.isLoading = false;
          this.cdr.detectChanges();
        }
      });
    } else {
      Object.keys(this.loginForm.controls).forEach(key => {
        this.loginForm.get(key)?.markAsTouched();
      });
    }
  }
}
