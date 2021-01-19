import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoanServiceMifos {
  baseURL = 'http://devenonebackendapp-env.eba-yrfqtiqs.us-east-2.elasticbeanstalk.com/api/loans/';

  loans;
  subs: Subscription;

  constructor(private http: HttpClient) { }

  /**
   * Get all the loan applications from the MIFOS database
   */
  // tslint:disable-next-line: typedef
  getAllLoans() {
    return this.http.get<any>(this.baseURL);
  }
}
