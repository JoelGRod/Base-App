import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormValidatorsService } from '../../../shared/services/form-validators.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  public form: FormGroup = this.fb.group({
    email: ['', 
            [ Validators.required,
            Validators.pattern(this.vs.email_pattern) ]
            ],
    password: ['',  
            [ Validators.required,
            Validators.minLength(6) ]
            ]
  });

  constructor( private fb: FormBuilder, 
              private vs: FormValidatorsService) { }


  login(): void {
    if(this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    };

    console.log(this.form.value);
    console.log(this.form.valid);
  }

}
