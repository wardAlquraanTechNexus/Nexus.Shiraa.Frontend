import { Component, inject } from '@angular/core';
import { StorageService } from '../../core/services/storage.service';

@Component({
  selector: 'app-profile-component',
  standalone: false,
  templateUrl: './profile-component.html',
  styleUrl: './profile-component.scss',
})
export class ProfileComponent {
  private storageService = inject(StorageService);

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
}
