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
  <h1>First Step</h1> 
    <ng-container [formGroup]="formGroup">
      <mat-form-field class="example-full-width">
        <mat-label>Name</mat-label>
        <input type="text" matInput formControlName="name" [id]="'name'" [errorStateMatcher]="matcher"
          placeholder="Some random name">
        @if (formGroup.get('name')?.hasError('minlength') && !formGroup.get('name')?.hasError('required') &&
        !formGroup.get('name')?.hasError('maxlength')) {
        <mat-error>Name must have more then 3 characters</mat-error>
        }
        @if (formGroup.get('name')?.hasError('maxlength') && !formGroup.get('name')?.hasError('required') &&
        !formGroup.get('name')?.hasError('minlength')) {
        <mat-error>Name must have less then 50 characters</mat-error>
        }
        @if (formGroup.get('name')?.hasError('required')) {
        <mat-error>Name is <strong>required</strong></mat-error>
        }
      </mat-form-field> 
      <mat-form-field class="example-full-width">
        <mat-label>Age</mat-label>
        <input type="number" matInput formControlName="age" [id]="'age'" [errorStateMatcher]="matcher"
          placeholder="Ex. pat@example.com">
        @if (formGroup.get('age')?.hasError('min') && !formGroup.get('age')?.hasError('required') &&
        !formGroup.get('age')?.hasError('max')) {
        <mat-error>Person must be older than 15 years to use the app</mat-error>
        }
        @if (formGroup.get('age')?.hasError('max') && !formGroup.get('age')?.hasError('required') &&
        !formGroup.get('age')?.hasError('min')) {
        <mat-error>Person must be younger than 100 years to use the app</mat-error>
        }
        @if (formGroup.get('age')?.hasError('required')) {
        <mat-error>Age is <strong>required</strong></mat-error>
        }
      </mat-form-field> 

    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FirstStepComponent {
  readonly parentFormContainer = inject(ControlContainer);

  get formGroup() {
    return this.parentFormContainer.control?.get('first') as FormGroup;
  }

  matcher = new MyErrorStateMatcher();
}
