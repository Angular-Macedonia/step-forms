import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';


import { filter } from 'rxjs';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatToolbarModule, MatIconModule, ReactiveFormsModule, FormsModule, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
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
