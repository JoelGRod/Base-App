import { Component } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) { }

  logout(): void {
    this.router.navigate(['/auth/login']);
  }

}
