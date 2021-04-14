import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// Validators
import { FormValidatorsService } from '../../../shared/services/form-validators.service';
// Services
import { AuthService } from '../../services/auth.service';
// Sweet Alert
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  public form: FormGroup = this.fb.group({
    email: ['test@test.com', 
            [ Validators.required,
            Validators.pattern(this.vs.email_pattern) ]
            ],
    password: ['123456',  
            [ Validators.required,
            Validators.minLength(6) ]
            ]
  });

  constructor( private fb: FormBuilder, 
              private vs: FormValidatorsService,
              private router: Router,
              private authService: AuthService) { }


  login(): void {
    if(this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    };

    const { email, password } = this.form.value;
    this.authService.login( email, password )
      .subscribe( resp => { 
        if(resp === true) {
          this.router.navigateByUrl('/protected');
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: resp
          })
        }
      });
  }

}
