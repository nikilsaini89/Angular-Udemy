import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounce, debounceTime, of } from 'rxjs';

function mustContainQuestionMark(control: AbstractControl){
  if(control.value.includes('?')){
    return null;
  }
  return {doesNotContainQuestionMark: true}
}

function isUniqueEmail(control: AbstractControl){
  if(control.value != 'test@gmail.com')
  {
    return of(null);
  }
  else return of({isDuplicateEmail: true})
}

const loadedForm = window.localStorage.getItem('saved-form');
let selectedEmail = '';
if(loadedForm){
  const temp = JSON.parse(loadedForm);
  selectedEmail = temp.email;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private destroyRef = inject(DestroyRef);

  form = new FormGroup({
    email: new FormControl(selectedEmail,{
      validators: [Validators.required, Validators.email],
      asyncValidators: [isUniqueEmail]
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6), mustContainQuestionMark]
    }),
  })

  ngOnInit(): void {
    const subscription = this.form.valueChanges.pipe(debounceTime(500)).subscribe(
      {
        next: (value) => window.localStorage.setItem('saved-form', JSON.stringify({email: value.email}))
      }
    )
    debugger;

    this.destroyRef.onDestroy(()=>subscription.unsubscribe());
  }
  public onSubmit(): void{
    console.log(this.form);
  }

  get isEmailInvalid(){
    return this.form.controls.email.dirty && 
    this.form.controls.email.touched &&
    this.form.controls.email.invalid
  }
  get isPasswordInvalid(){
    return this.form.controls.password.dirty && 
    this.form.controls.password.touched &&
    this.form.controls.password.invalid
  }
}


