import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, FbAuthResponse } from 'src/app/shared/interfaces';
import { Observable } from 'rxjs';
import { environment } from "../../../../environments/environment";
import { tap } from "rxjs/operators";

@Injectable()

export class AuthService {

  constructor( private http: HttpClient ) { }

  get token(): string {
    const exDate = new Date(localStorage.getItem('fb-token-exp'));
    if (new Date() > exDate) {
      this.logOut();
      return null
    }
    return localStorage.getItem('fb-token');
  }

  login(user: User): Observable <any> {
    user.returnSecureToken = true;
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
    .pipe(
      tap(this.setToken));
  }

  logOut(){
    this.setToken(null);
   //return this.http.delete(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.apiKey}`);
  }

  isAuth():boolean {
    return !!this.token;
  }

  private setToken(response: FbAuthResponse | null) {
    if (response) {
    //console.log(response);
    const exDate = new Date(new Date().getTime() + +response.expiresIn*1000);
    localStorage.setItem('fb-toke', response.idToken);
    localStorage.setItem('fb-token-exp', exDate.toString())
  } else {
    localStorage.clear();
  }
  }
}
