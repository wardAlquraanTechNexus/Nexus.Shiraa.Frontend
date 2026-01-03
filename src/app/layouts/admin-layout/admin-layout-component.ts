import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '../../core/services/translate.service';
import { StorageService } from '../../core/services/storage.service';

@Component({
  selector: 'app-admin-layout',
  standalone: false,
  templateUrl: './admin-layout-component.html',
  styleUrl: './admin-layout-component.scss',
})
export class AdminLayoutComponent {
  private translateService = inject(TranslateService);
  private storageService = inject(StorageService);
  private router = inject(Router);

  sidebarCollapsed = false;
  date = new Date();

  constructor() {
    console.log('AdminLayoutComponent initialized');
  }

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  get currentLanguage() {
    return this.translateService.currentLanguage();
  }

  setLanguage(lang: 'en' | 'ar') {
    this.translateService.setLanguage(lang);
  }

  get user() {
    return this.storageService.getUser();
  }

  get userFullName(): string {
    const user = this.user;
    if (user) {
      return `${user.firstName} ${user.lastName}`.trim();
    }
    return 'Guest';
  }

  get userInitials(): string {
    const user = this.user;
    if (user) {
      const first = user.firstName?.charAt(0) || '';
      const last = user.lastName?.charAt(0) || '';
      return `${first}${last}`.toUpperCase();
    }
    return 'G';
  }

  logout(): void {
    this.storageService.clearAuth();
    this.router.navigate(['/']);
  }
}
