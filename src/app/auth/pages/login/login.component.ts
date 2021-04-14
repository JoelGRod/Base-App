import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// Validators
import { FormValidatorsService } from '../../../shared/services/form-validators.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  public form: FormGroup = this.fb.group({
    email: ['test@email.com', 
            [ Validators.required,
            Validators.pattern(this.vs.email_pattern) ]
            ],
    password: ['123456hfkfhskhBMBuk_NBNMBD',  
            [ Validators.required,
            Validators.minLength(6) ]
            ]
  });

  constructor( private fb: FormBuilder, 
              private vs: FormValidatorsService,
              private router: Router) { }


  login(): void {
    if(this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    };
    
    this.router.navigateByUrl('/protected');
    console.log(this.form.value);
    console.log(this.form.valid);

  }

}
