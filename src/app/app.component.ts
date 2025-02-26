import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators, NgForm, FormControl, FormGroupDirective, } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button'; 
import { filter } from 'rxjs';
import { JsonPipe } from '@angular/common';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatToolbarModule, MatIconModule, ReactiveFormsModule, FormsModule, MatButtonModule, JsonPipe],
  template: `
  <mat-toolbar>
  <mat-toolbar-row>
    <span>Form Step Control </span>
  </mat-toolbar-row>
</mat-toolbar>

<content>
  <form [formGroup]="form" (ngSubmit)="onSubmit()" #formRef>

    <router-outlet />

    <div class="actions">
      <div class="action-navigation">
        <button [disabled]="isFirstStepActive()" mat-raised-button [routerLink]="['/first-step']"
          routerLinkActive="router-link-active">Previous</button>

        <button [disabled]="form.get('first')?.invalid" mat-raised-button [routerLink]="['/second-step']"
          routerLinkActive="router-link-active">Next</button>
      </div>

      <button [disabled]="form.invalid" mat-raised-button>Save</button>
    </div>
  </form> 
  <div class="form-state">
    <div>
      <pre>{{ form.value | json }}</pre>
    </div>

    <div class="form-errors">

      <div> <b>Name:</b>
        <pre>{{ form.get('first')?.get('name')?.errors | json }}</pre>
      </div>

      <div>
        <b>Age:</b>
        <pre>{{ form.get('first')?.get('age')?.errors | json }}</pre>
      </div>

      <div><b>Name:</b>
        <pre>{{ form.get('second')?.get('email')?.errors | json }}</pre>
      </div>
      <div><b>Name:</b>
        <pre>{{ form.get('second')?.get('phone')?.errors | json }}</pre>
      </div>
    </div>
  </div> 
</content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'step-form';

  readonly #fb = inject(FormBuilder);
  readonly #router = inject(Router);

  form = this.#fb.group({
    first: this.#fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      age: ['', [Validators.required, Validators.max(100), Validators.min(15)]],
    }),
    second: this.#fb.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[- +()0-9]+$')]],
    }),
  })

  isFirstStepActive = signal(true);



  ngOnInit(): void {
    this.#router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((navigationEvent: NavigationEnd) => {
      if (navigationEvent instanceof NavigationEnd) {
        this.isFirstStepActive.set(navigationEvent.url.slice(1).split('/')[0] === 'first-step');
      }
    }); 
  }
 
  onSubmit() {
    console.log(this.form.value);
  }
} 

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}