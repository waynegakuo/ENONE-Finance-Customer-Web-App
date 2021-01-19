import { Injectable } from '@angular/core';
import {throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MailSmsService {
  baseUrl = 'http://devenonebackendapp-env.eba-yrfqtiqs.us-east-2.elasticbeanstalk.com/api/mail/loan';

  constructor(private http: HttpClient) { }

  /**
   * Trigger sending of email and SMS after body data is provided
   */
  // tslint:disable-next-line: typedef
  sendMailSms(body) {
    return this.http.post<any>(this.baseUrl, body)
      .pipe(catchError(this.errorHandler));
  }

  /**
   * Error handling method for console
   * @param error error passed as a parameter
   */
  // tslint:disable-next-line: typedef
  errorHandler(error: HttpErrorResponse) {
    return throwError(`Something went wrong: ${error.message}`);
  }
}
