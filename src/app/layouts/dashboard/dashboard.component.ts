import { LoanService } from './../../shared/services/loan/loan.service';
import { User } from './../../shared/models/user';
import { Observable, Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { AngularFireFunctions } from '@angular/fire/functions';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  user;
  userDetails;
  displayName;
  email;
  errorMsg;
  loans = [];
  userSub: Subscription;
  loanSub: Subscription;
  subs: Subscription;

  data;

  constructor(private loanService: LoanService, private cloudFunctions: AngularFireFunctions) { }

  ngOnInit(): void {
    this.loanSub = this.loanService.getLoans().subscribe(
      data => this.loans = data,
      error => this.errorMsg = error
    );

    this.userSub = this.loanService.getCurrentUserDetails().subscribe(a => {
      this.userDetails =  a.data();
      this.displayName = this.userDetails.displayName;
      this.email = this.userDetails.email;
    },
      error => this.errorMsg = error
    );
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    this.loanSub.unsubscribe();
    // this.subs.unsubscribe();
  }

  // tslint:disable-next-line: typedef
  // cloudFunction() {
  //   this.subs = this.cloudFunctions.httpsCallable('greetingsCall')({ text: 'Some Request Data' })
  //     .pipe(first())
  //     .subscribe(resp => {
  //       console.log({ resp });
  //     },
  //       err => {
  //         console.log(err);
  //       }
  //     );
  // }
}
