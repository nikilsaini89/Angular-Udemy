import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


function equalValue(control1: string, control2: string){
  return (control: AbstractControl)=>{
    const val1 = control.get(control1)?.value;
    const val2 = control.get(control2)?.value;

    if(val1==val2) return null;
    return {valuesNotEqaul: true};
  }
}
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  form = new FormGroup({
    email: new FormControl(''),
    passwords: new FormGroup({
      password: new FormControl('',{
        validators: [Validators.required, Validators.minLength(6)]
      }),
      confirmPassword: new FormControl('',{
        validators: [Validators.required, Validators.minLength(6)]
      }),
    },
    {
      validators: [equalValue('password', 'confirmPassword')]
    }),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    address: new FormGroup({
      street: new FormControl(''),
      number: new FormControl(''),
      postalCode: new FormControl(''),
      city: new FormControl(''),
    }),
    source: new FormArray([
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
    ]),
    role: new FormControl(''),
    agree: new FormControl(''),
  })
  onSubmit(){ 
    debugger;
    console.log(this.form);
  }
  onReset(){
    this.form.reset();
  }
}
