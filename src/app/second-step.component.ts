import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import {
  FormsModule,
  ReactiveFormsModule,
  ControlContainer,
  FormGroup,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MyErrorStateMatcher } from './app.component';
 
 
@Component({ 
  imports: [ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule],
  template: `
  <h1>Second Step</h1> 
    <ng-container [formGroup]="formGroup">
      <mat-form-field class="example-full-width">
        <mat-label>Email</mat-label>
        <input type="email" matInput formControlName="email" [id]="'email'" [errorStateMatcher]="matcher"
          placeholder="Ex. pat@example.com">
        @if (formGroup.get('email')?.hasError('email') && !formGroup.get('email')?.hasError('required')) {
        <mat-error>Please enter a valid email address</mat-error>
        }
        @if (formGroup.get('email')?.hasError('required')) {
        <mat-error>Email is <strong>required</strong></mat-error>
        }
      </mat-form-field> 

      <mat-form-field class="example-full-width">
        <mat-label>Phone</mat-label>
        <input matInput formControlName="phone" [id]="'phone'" type="tel" [errorStateMatcher]="matcher"
          placeholder="(02) 9999 9999 / 555-999-9999"> 
          @if (formGroup.get('phone')?.hasError('pattern') && !formGroup.get('phone')?.hasError('required')) {
            <mat-error>Please enter a valid phone number in the format of (02) 9999 9999 or 9999 9999</mat-error>
            }

        @if (formGroup.get('phone')?.hasError('required')) {
        <mat-error>Phone is <strong>required</strong></mat-error>
        }
      </mat-form-field>  
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SecondStepComponent {
  readonly parentFormContainer = inject(ControlContainer);

  get formGroup() {
    return this.parentFormContainer.control?.get('second') as FormGroup;
  }
  matcher = new MyErrorStateMatcher();
}
