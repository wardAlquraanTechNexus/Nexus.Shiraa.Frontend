import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface ConfirmDialogData {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
}

@Component({
  selector: 'app-confirm-dialog',
  standalone: false,
  template: `
    <div class="confirm-dialog">
      <div class="dialog-header">
        <div class="icon-wrapper" [ngClass]="data.type || 'danger'">
          <mat-icon>{{ getIcon() }}</mat-icon>
        </div>
        <h2>{{ data.title }}</h2>
      </div>

      <div class="dialog-body">
        <p>{{ data.message }}</p>
      </div>

      <div class="dialog-actions">
        <button mat-stroked-button (click)="onCancel()">
          {{ data.cancelText || 'Cancel' }}
        </button>
        <button mat-flat-button [ngClass]="'btn-' + (data.type || 'danger')" (click)="onConfirm()">
          {{ data.confirmText || 'Confirm' }}
        </button>
      </div>
    </div>
  `,
  styles: [`
    .confirm-dialog {
      padding: 8px;
    }

    .dialog-header {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      margin-bottom: 16px;
    }

    .icon-wrapper {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 16px;
    }

    .icon-wrapper mat-icon {
      font-size: 28px;
      width: 28px;
      height: 28px;
    }

    .icon-wrapper.danger {
      background-color: #fef2f2;
      color: #ef4444;
    }

    .icon-wrapper.warning {
      background-color: #fffbeb;
      color: #f59e0b;
    }

    .icon-wrapper.info {
      background-color: #eff6ff;
      color: #3b82f6;
    }

    .dialog-header h2 {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      color: #1f2937;
    }

    .dialog-body {
      text-align: center;
      margin-bottom: 24px;
    }

    .dialog-body p {
      margin: 0;
      color: #6b7280;
      font-size: 14px;
      line-height: 1.5;
    }

    .dialog-actions {
      display: flex;
      gap: 12px;
      justify-content: center;
    }

    .dialog-actions button {
      min-width: 100px;
      border-radius: 8px;
    }

    .btn-danger {
      background-color: #ef4444 !important;
      color: white !important;
    }

    .btn-danger:hover {
      background-color: #dc2626 !important;
    }

    .btn-warning {
      background-color: #f59e0b !important;
      color: white !important;
    }

    .btn-warning:hover {
      background-color: #d97706 !important;
    }

    .btn-info {
      background-color: #3b82f6 !important;
      color: white !important;
    }

    .btn-info:hover {
      background-color: #2563eb !important;
    }
  `]
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ) {}

  getIcon(): string {
    switch (this.data.type) {
      case 'warning':
        return 'warning';
      case 'info':
        return 'info';
      case 'danger':
      default:
        return 'delete_outline';
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
