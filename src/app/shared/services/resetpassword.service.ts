import { ResetPassword } from './../models/resetpassword';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResetpasswordService {
  url = 'http://localhost:3000/resetpassword';

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line: typedef
  resetPassword(user: ResetPassword){
    return this.http.post<any>(this.url, user)
    .pipe(catchError(this.errorHandler));
  }

  // tslint:disable-next-line: typedef
  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
