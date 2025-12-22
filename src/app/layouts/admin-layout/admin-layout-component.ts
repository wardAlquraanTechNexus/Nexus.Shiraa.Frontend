import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  standalone: false,
  templateUrl: './admin-layout-component.html',
  styleUrl: './admin-layout-component.scss',
})
export class AdminLayoutComponent {
  sidebarCollapsed = false;

  date = new Date();
  constructor() {
    console.log('AdminLayoutComponent initialized');
  }

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }
}
