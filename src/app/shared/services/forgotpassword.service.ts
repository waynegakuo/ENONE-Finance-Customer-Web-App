import { ForgotPassword } from './../models/forgotpassword';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotpasswordService {

  url = 'http://localhost:3000/forgotpassword';

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line: typedef
  forgotPassword(user: ForgotPassword){
    return this.http.post<any>(this.url, user)
    .pipe(catchError(this.errorHandler));
  }

  // tslint:disable-next-line: typedef
  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
