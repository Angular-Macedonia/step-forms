import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import {
  FormsModule,
  ReactiveFormsModule,
  ControlContainer,
  FormGroup,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MyErrorStateMatcher } from '../validators/custom-state-matcher';


/** Error when invalid control is dirty, touched, or submitted. */


@Component({
  selector: 'first-step',
  imports: [ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './second-step.component.html',
  styleUrls: ['./second-step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SecondStepComponent {
  readonly parentFormContainer = inject(ControlContainer);

  get formGroup() {
    return this.parentFormContainer.control?.get('second') as FormGroup;
  }
  matcher = new MyErrorStateMatcher();
}
