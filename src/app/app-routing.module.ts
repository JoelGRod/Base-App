import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidateTokenGuard } from './shared/guards/validate-token.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule ),
  },
  {
    path: 'protected',
    loadChildren: () => import('./protected/protected.module').then( m => m.ProtectedModule ),
    canLoad: [ValidateTokenGuard],
    canActivate: [ValidateTokenGuard]
  },
  { path: '**', redirectTo: 'auth' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
