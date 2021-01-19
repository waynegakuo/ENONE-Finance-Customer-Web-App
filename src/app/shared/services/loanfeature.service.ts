import { LoanType } from './../models/loantype';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoanfeatureService {

  url = '/assets/data/loanfeatures.json';
  personalLoansUrl = '/assets/data/personalloans.json';
  businessLoansUrl = '/assets/data/businessloans.json';

  constructor(private http: HttpClient) { }

  getLoanFeatures(): Observable<LoanType[]> {
    return this.http.get<LoanType[]>(this.url)
      .pipe(
        catchError(this.errorHandler)
      );
  }
  getPersonalLoanFeatures(): Observable<LoanType[]> {
    return this.http.get<LoanType[]>(this.personalLoansUrl)
      .pipe(
        catchError(this.errorHandler)
      );
  }
  getBusinessLoanFeatures(): Observable<LoanType[]> {
    return this.http.get<LoanType[]>(this.businessLoansUrl)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  // tslint:disable-next-line: typedef
  errorHandler(error: HttpErrorResponse) {
    return throwError(`Something went wrong: ${error.message}`);
  }
}
