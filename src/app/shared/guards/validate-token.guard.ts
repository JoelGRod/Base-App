import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
// RXJS
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
// Services
import { AuthService } from 'src/app/auth/services/auth.service';
// Sweet Alert 2
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ValidateTokenGuard implements CanActivate, CanLoad {

  constructor( private authService: AuthService,
                private router: Router ) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.renew_token()
      .pipe(
        tap( valid => {
          // if(!valid) this.router.navigateByUrl('/auth/login');
          if(!valid) {
            this.router.navigateByUrl('/auth/login');
            Swal.fire('Any fool can use a computer');
          };
        })
      );
  }
  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.renew_token()
    .pipe(
      tap( valid => {
        // if(!valid) this.router.navigateByUrl('/auth/login');
        if(!valid) {
          this.router.navigateByUrl('/auth/login');
          Swal.fire('Any fool can use a computer');
        };
      })
    );
  }
}
