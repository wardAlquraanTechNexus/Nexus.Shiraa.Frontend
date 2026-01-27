import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-base-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './base-dialog.component.html',
  styleUrls: ['./base-dialog.component.scss']
})
export class BaseDialogComponent {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() icon = 'edit';
  @Input() saveText = 'Save';
  @Input() cancelText = 'Cancel';
  @Input() saveIcon = 'save';
  @Input() cancelIcon = 'close';
  @Input() isSubmitting = false;
  @Input() disableSave = false;

  @Output() save = new EventEmitter<void>();

  constructor(private dialogRef: MatDialogRef<BaseDialogComponent>) {}

  onSave(): void {
    this.save.emit();
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
