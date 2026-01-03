import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly platformId = inject(PLATFORM_ID);

  private get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  setItem(key: string, value: string): void {
    if (this.isBrowser) {
      localStorage.setItem(key, value);
    }
  }

  getItem(key: string): string | null {
    if (this.isBrowser) {
      return localStorage.getItem(key);
    }
    return null;
  }

  removeItem(key: string): void {
    if (this.isBrowser) {
      localStorage.removeItem(key);
    }
  }

  clear(): void {
    if (this.isBrowser) {
      localStorage.clear();
    }
  }

  // Auth-specific methods
  setToken(token: string): void {
    this.setItem('token', token);
  }

  getToken(): string | null {
    return this.getItem('token');
  }

  setUser(user: { id: string; userName: string; email: string; firstName: string; lastName: string }): void {
    this.setItem('user', JSON.stringify(user));
  }

  getUser(): { id: string; userName: string; email: string; firstName: string; lastName: string } | null {
    const user = this.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  clearAuth(): void {
    this.removeItem('token');
    this.removeItem('user');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
