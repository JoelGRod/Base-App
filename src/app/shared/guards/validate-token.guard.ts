import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
// RXJS
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
// Services
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidateTokenGuard implements CanActivate, CanLoad {

  constructor( private authService: AuthService,
                private router: Router ) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.renew_token()
      .pipe(
        tap( resp => {
          if(!resp) this.router.navigateByUrl('/auth/login');
        })
      );
  }
  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.renew_token()
    .pipe(
      tap( resp => {
        if(!resp) this.router.navigateByUrl('/auth/login');
      })
    );
  }
}
