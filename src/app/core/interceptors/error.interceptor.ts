import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SnackbarService } from '../../shared/services/snackbar.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private snackbar: SnackbarService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        const errorMessage = this.getErrorMessage(error);
        this.snackbar.error(errorMessage);
        return throwError(() => error);
      })
    );
  }

  private getErrorMessage(error: HttpErrorResponse): string {
    if (error.status === 0) {
      return 'Unable to connect to server. Please check your internet connection.';
    }

    if (error.error) {
      // Handle the API error format
      if (error.error.Title) {
        return error.error.Title;
      }

      if (error.error.Detail) {
        return error.error.Detail;
      }

      if (error.error.Errors && Object.keys(error.error.Errors).length > 0) {
        const errors = Object.values(error.error.Errors).flat();
        return errors.join(' ');
      }

      if (error.error.message) {
        return error.error.message;
      }

      if (typeof error.error === 'string') {
        return error.error;
      }
    }

    // Default messages based on status code
    switch (error.status) {
      case 400:
        return 'Bad request. Please check your input.';
      case 401:
        return 'Unauthorized. Please login again.';
      case 403:
        return 'Access denied. You do not have permission.';
      case 404:
        return 'Resource not found.';
      case 500:
        return 'Internal server error. Please try again later.';
      default:
        return 'An unexpected error occurred. Please try again.';
    }
  }
}
