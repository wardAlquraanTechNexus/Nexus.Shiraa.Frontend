import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, Subscription, isObservable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export interface SelectOption {
  value: any;
  label: string;
}

@Component({
  selector: 'app-select-input',
  standalone: false,
  templateUrl: './select-input.component.html',
  styleUrl: './select-input.component.scss'
})
export class SelectInputComponent implements OnInit, OnDestroy, OnChanges {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() icon: string = '';
  @Input() options: SelectOption[] | Observable<SelectOption[]> = [];
  @Input() formGroup!: FormGroup;
  @Input() controlName: string = '';
  @Output() selectionChange = new EventEmitter<any>();

  constructor(private cdr: ChangeDetectorRef) {}
  resolvedOptions: SelectOption[] = [];
  isLoading = false;

  private destroy$ = new Subject<void>();
  private optionsSubscription?: Subscription;

  get control() {
    return this.formGroup?.get(this.controlName);
  }

  get isRequired(): boolean {
    return this.control?.hasValidator(Validators.required) ?? false;
  }

  ngOnInit(): void {
    this.loadOptions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options'] && !changes['options'].firstChange) {
      this.loadOptions();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.optionsSubscription?.unsubscribe();
  }

  private loadOptions(): void {
    // Unsubscribe from previous subscription if exists
    this.optionsSubscription?.unsubscribe();

    if (isObservable(this.options)) {
      this.isLoading = true;
      this.optionsSubscription = this.options.pipe(takeUntil(this.destroy$)).subscribe({
        next: (options) => {
          this.cdr.markForCheck();
          this.resolvedOptions = options;
          this.isLoading = false;
        },
        error: () => {
          this.cdr.markForCheck();
          this.resolvedOptions = [];
          this.isLoading = false;
        }
      });
    } else {
      this.resolvedOptions = this.options;
    }
  }

  onSelectionChange(value: any): void {
    this.selectionChange.emit(value);
  }
}
