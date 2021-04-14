import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// RXJS
import { Observable, of, pipe } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
// Environment
import { environment } from 'src/environments/environment';
// Interfaces
import { AuthResponse, User } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _base_url: string = environment.base_url;
  private _user!: User;

  get user() {
    return { ...this._user };
  }

  constructor( private http: HttpClient ) { }

  public login(email: string, password: string) {

    const url: string = `${this._base_url}/auth/login`; 
    const body: any = { email, password };

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        map( resp => {
          if( resp.ok ) {
            localStorage.setItem('token', resp.token!);
            this._user = {
              uid: resp.uid!,
              name: resp.name!
            };
          }
          return resp.ok
        }),
        catchError( error => of(error.error.msg) )
      );
  }

  public register_user(name: string, email: string, password: string) {
    const url: string = `${this._base_url}/auth/new`;
    const body = { name, email, password };

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        map( resp => {
          return resp.ok;
        }),
        catchError( error => of(error.error.msg) )
      );
  }

  // validate-token Guard
  public renew_token(): Observable<boolean> {
    const url: string = `${this._base_url}/auth/renew`;
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');
    
    return this.http.get<AuthResponse>(url, {headers: headers})
      .pipe(
        map( resp => {
          if( resp.ok ) {
            localStorage.setItem('token', resp.token!);
            this._user = {
              uid: resp.uid!,
              name: resp.name!
            };
          }
          return resp.ok
        }),
        catchError( error => of(false))
      );
  }

  public logout(): void {
    localStorage.clear();
  }
}
