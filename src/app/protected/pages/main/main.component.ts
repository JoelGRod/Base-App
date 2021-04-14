import { Component } from '@angular/core';
import { Router } from '@angular/router';
// Services
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styles: [
    `
    * {
      margin: 2rem;
    }
    `
  ]
})
export class MainComponent {

  get user() {
    return this.authService.user;
  }

  constructor(private router: Router,
              private authService: AuthService) { }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

}
