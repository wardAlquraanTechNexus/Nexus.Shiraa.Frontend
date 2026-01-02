import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: false,
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() label: string = 'Submit';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() color: 'primary' | 'accent' | 'warn' = 'primary';
  @Input() variant: 'raised' | 'flat' | 'stroked' | 'basic' = 'raised';
  @Input() loading: boolean = false;
  @Input() disabled: boolean = false;
  @Input() icon: string = '';
  @Input() fullWidth: boolean = true;

  @Output() clicked = new EventEmitter<void>();

  onClick(): void {
    if (!this.loading && !this.disabled) {
      this.clicked.emit();
    }
  }

  get isDisabled(): boolean {
    return this.loading || this.disabled;
  }
}
