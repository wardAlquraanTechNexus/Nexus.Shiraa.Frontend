import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-slide-toggle-input',
  standalone: false,
  templateUrl: './slide-toggle-input.component.html',
  styleUrl: './slide-toggle-input.component.scss'
})
export class SlideToggleInputComponent {
  @Input() label: string = '';
  @Input() description: string = '';
  @Input() activeText: string = 'Active';
  @Input() inactiveText: string = 'Inactive';
  @Input() activeIcon: string = 'check_circle';
  @Input() inactiveIcon: string = 'cancel';
  @Input() formGroup!: FormGroup;
  @Input() controlName: string = '';
  @Input() showCard: boolean = true;

  get control() {
    return this.formGroup?.get(this.controlName);
  }

  get isActive(): boolean {
    return this.control?.value ?? false;
  }
}
