import { LoansappliedService } from './../../services/loansapplied/loansapplied.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-loan-application-details',
  templateUrl: './loan-application-details.component.html',
  styleUrls: ['./loan-application-details.component.scss']
})
export class LoanApplicationDetailsComponent implements OnInit, OnDestroy {
  subs: Subscription;
  loanApplicationId;
  loansApplied;
  fileUploads;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private loans: LoansappliedService,
              private location: Location) { }

  ngOnInit(): void {
    this.subs = this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');
      this.loanApplicationId = id;
    });

    this.loansApplied = this.loans.getLoansApplied(this.loanApplicationId);
    this.fileUploads = this.loans.getFileUploads(this.loanApplicationId);
  }

  /**
   * Method used to move back to previous page
   */
  // tslint:disable-next-line: typedef
  goBack(){
    this.location.back();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
