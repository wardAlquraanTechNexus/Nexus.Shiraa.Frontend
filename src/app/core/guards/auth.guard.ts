import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

export const authGuard: CanActivateFn = (route, state) => {
  const platformId = inject(PLATFORM_ID);
  const storageService = inject(StorageService);
  const router = inject(Router);

  // Allow navigation during SSR, client will handle auth check
  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  if (storageService.isAuthenticated()) {
    return true;
  }

  // Redirect to login page (root path) with return url
  router.navigate(['/'], {
    queryParams: { returnUrl: state.url }
  });
  return false;
};

// Guard to prevent authenticated users from accessing auth pages (login, register)
export const guestGuard: CanActivateFn = (route, state) => {
  const platformId = inject(PLATFORM_ID);
  const storageService = inject(StorageService);
  const router = inject(Router);

  // Allow navigation during SSR, client will handle auth check
  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  if (!storageService.isAuthenticated()) {
    return true;
  }

  // Redirect to admin if already authenticated
  router.navigate(['/admin']);
  return false;
};
