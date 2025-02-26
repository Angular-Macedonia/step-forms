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


@Component({
  selector: 'first-step',
  imports: [ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './first-step.component.html',
  styleUrls: ['./first-step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FirstStepComponent {
  readonly parentFormContainer = inject(ControlContainer);

  get formGroup() {
    return this.parentFormContainer.control?.get('first') as FormGroup;
  }

  matcher = new MyErrorStateMatcher();
}
