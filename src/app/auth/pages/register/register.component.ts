import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormValidatorsService } from 'src/app/shared/services/form-validators.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent {

  public form: FormGroup = this.fb.group({
    name: ['joel', 
          [ Validators.required,
            Validators.minLength(3) ]
          ],
    email: ['test@email.com',
          [ Validators.required, 
            Validators.pattern(this.vs.email_pattern) ]
          ],
    password: ['123456',
          [ Validators.required,
            Validators.minLength(6) ]
          ]
  });

  constructor(private fb: FormBuilder,
              private vs: FormValidatorsService) { }

  register(): void {
    if(this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    console.log(this.form.value);
    console.log(this.form.valid);
  }

}
