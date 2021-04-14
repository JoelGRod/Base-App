import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// Validators
import { FormValidatorsService } from 'src/app/shared/services/form-validators.service';
// Services
import { AuthService } from '../../services/auth.service';
// Sweet Alert
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent {

  public form: FormGroup = this.fb.group({
    name: ['', 
          [ Validators.required,
            Validators.minLength(3) ]
          ],
    email: ['',
          [ Validators.required, 
            Validators.pattern(this.vs.email_pattern) ]
          ],
    password: ['',
          [ Validators.required,
            Validators.minLength(6) ]
          ]
  });

  constructor(private fb: FormBuilder,
              private vs: FormValidatorsService,
              private router: Router,
              private authService: AuthService) { }

  register(): void {
    if(this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { name, email, password } = this.form.value;
    this.authService.register_user(name, email, password)
      .subscribe( resp => {
        if(resp === true) {
          this.router.navigateByUrl('/auth/login');
          Swal.fire({
            icon: 'success',
            title: '',
            text: 'User created successfully'
          })
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
