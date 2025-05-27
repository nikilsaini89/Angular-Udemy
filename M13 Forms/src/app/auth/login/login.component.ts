import { afterNextRender, Component, DestroyRef, inject, viewChild, } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private form = viewChild.required<NgForm>('form');
  private destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const saved = window.localStorage.getItem('login-form')
      if(saved){
        const parsed = JSON.parse(saved);
        console.log(parsed);
        this.form().controls['email']?.setValue(parsed.email)
      }
      const subs = this.form().valueChanges?.pipe(debounceTime(500)).subscribe({
        next: (value) => window.localStorage.setItem('login-form', 
          JSON.stringify({ email: value.email }))
      });


    this.destroyRef.onDestroy(()=>subs?.unsubscribe())

    });

  }

  onSubmit(formData: NgForm, form2: HTMLFormElement) {
    console.log(formData);
  }
}
