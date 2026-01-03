import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-form-card',
  standalone: false,
  templateUrl: './form-card.component.html',
  styleUrl: './form-card.component.scss',
})
export class FormCardComponent {
  @Input() title: string = '';
  @Input() editTitle: string = '';
  @Input() isEditing: boolean = false;
  @Input() isLoading: boolean = false;
  @Input() submitLabel: string = 'Create';
  @Input() editSubmitLabel: string = 'Update';
  @Input() cancelLabel: string = 'Cancel';
  @Input() showCancel: boolean = true;

  @Output() cancel = new EventEmitter<void>();
  @Output() formSubmit = new EventEmitter<void>();

  get displayTitle(): string {
    return this.isEditing ? (this.editTitle || this.title) : this.title;
  }

  get displaySubmitLabel(): string {
    return this.isEditing ? this.editSubmitLabel : this.submitLabel;
  }

  onCancel(): void {
    this.cancel.emit();
  }

  onSubmit(): void {
    this.formSubmit.emit();
  }
}
