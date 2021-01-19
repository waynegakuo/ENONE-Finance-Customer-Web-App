import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService implements OnDestroy {
  baseURL = 'http://devenonebackendapp-env.eba-yrfqtiqs.us-east-2.elasticbeanstalk.com/api/clients';
  clients;
  subs: Subscription;

  constructor(private http: HttpClient) { }

  /**
   * Get all clients from the MIFOS Database
   */
  // tslint:disable-next-line: typedef
  getAllClients() {
    return this.http.get<any>(this.baseURL);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
