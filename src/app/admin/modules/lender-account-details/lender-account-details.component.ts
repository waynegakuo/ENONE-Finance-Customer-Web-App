import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { LenderService } from '../../services/lender/lender.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-lender-account-details',
  templateUrl: './lender-account-details.component.html',
  styleUrls: ['./lender-account-details.component.scss']
})
export class LenderAccountDetailsComponent implements OnInit, OnDestroy {
  subs: Subscription;
  lenderAccountID;
  lenderAccount;
  editAccount: boolean;

  constructor(private activatedRoute: ActivatedRoute, public lenders: LenderService, private router: Router,
              private location: Location) { }

  ngOnInit(): void {
    // Getting Lender Account ID from the route parameter ~ from the Lender Profile Details page
    this.subs = this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');
      this.lenderAccountID = id;
    });

    this.lenderAccount = this.lenders.getLenderAccountDetails(this.lenderAccountID);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  /**
   * Method used to move back to previous page
   */
  // tslint:disable-next-line: typedef
  goBack() {
    this.location.back();
  }

  // tslint:disable-next-line: typedef
  editLenderAccount(lenderAccount) {
    this.editAccount = !this.editAccount;
    this.lenders.populateForm(lenderAccount);
  }

  // tslint:disable-next-line: typedef
  updateLenderAccount(lenderAccount) {
    this.lenders.updateLenderAccount(lenderAccount);
    this.editAccount = !this.editAccount;
  }
}
