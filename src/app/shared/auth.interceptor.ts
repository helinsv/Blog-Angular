import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';
import { AuthService } from '../admin/shared/servises/auth.service';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.isAuth()) {
      req = req.clone({
        setParams: {
          auth: this.auth.token
        }
      })
    }
    return next.handle(req)
      .pipe(
        tap(() => {
          console.log('inter')
        }),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.auth.logOut()
            this.router.navigate(['/admin', 'login']), {
              queryParams: {
                authFailed: true
              }
            }
          }
          return throwError(error);
        })
      )
  }
}
