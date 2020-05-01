import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User, FbAuthResponse } from 'src/app/shared/interfaces';
import { Observable, throwError, Subject } from 'rxjs';
import { environment } from "../../../../environments/environment";
import { tap, catchError } from "rxjs/operators";

@Injectable()

export class AuthService {

  public error$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) { }

  get token(): string {
    const exDate = new Date(localStorage.getItem('fb-token-exp'));
    if (new Date() > exDate) {
      this.logOut();
      return null
    }
    return localStorage.getItem('fb-token');
  }

  login(user: User): Observable<any> {
    user.returnSecureToken = true;
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this)));
  }

  logOut() {
    this.setToken(null);
    //return this.http.delete(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.apiKey}`);
  }

  isAuth(): boolean {
    return !!this.token;
  }

  private handleError(error: HttpErrorResponse) {
    const { message } = error.error.error;
    switch (message) {
      case 'INVALID_EMAIL':
        this.error$.next('INVALID EMAIL')
        break;
      case 'INVALID_PASSWORD':
        this.error$.next('INVALID PASSWORD')
        break;
      case 'EMAIL_NOT_FOUND':
        this.error$.next('EMAIL NOT FOUND')
        break;
    }
    return throwError(error);
  }

  private setToken(response: FbAuthResponse | null) {
    if (response) {
      //console.log(response);
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
      localStorage.setItem('fb-token', response.idToken);
      localStorage.setItem('fb-token-exp', expDate.toString())
    } else {
      localStorage.clear();
    }
  }
}
