import { Subscription } from 'rxjs';
import { DashboardService } from './../services/dashboard.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireFunctions } from '@angular/fire/functions';
import { first } from 'rxjs/operators';
import { LoanService } from 'src/app/shared/services/loan/loan.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  createAdminForm: FormGroup;
  subs: Subscription;
  errorMsg;
  successMsg;

  userDetails;
  displayName;
  email;
  userSub: Subscription;

  constructor(private fb: FormBuilder, private cloudFunctions: AngularFireFunctions, private loanService: LoanService) { }

  ngOnInit(): void {
    this.userSub = this.loanService.getCurrentUserDetails().subscribe(a => {
      this.userDetails = a.data();
      this.displayName = this.userDetails.displayName;
      this.email = this.userDetails.email;
    },
      error => this.errorMsg = error
    );

    this.createAdminForm = this.fb.group({
      email: ['', Validators.required]
    });
  }

  // tslint:disable-next-line: typedef
  makeAdmin() {
    console.log('We are submitting...');
    const adminEmail = this.createAdminForm.controls.email.value;
    console.log(adminEmail);
    const addAdmin = this.cloudFunctions.httpsCallable('addAdminRole');
    addAdmin({ email: adminEmail })
      .pipe(first())
      .subscribe(resp => {
        console.log(resp);
        this.successMsg = resp;
      },
        err => {
          this.errorMsg = err;
        }
      );
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
