import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LenderService } from '../../services/lender/lender.service';

@Component({
  selector: 'app-lender-profile-details',
  templateUrl: './lender-profile-details.component.html',
  styleUrls: ['./lender-profile-details.component.scss']
})
export class LenderProfileDetailsComponent implements OnInit, OnDestroy {
  lenderProfileId;
  subs: Subscription;
  lenderAccounts;

  constructor(private activatedRoute: ActivatedRoute, private lenders: LenderService, private router: Router) { }

  ngOnInit(): void {
    // Getting Lender Profile ID from the route parameter
    this.subs = this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');
      this.lenderProfileId = id;
    });

    this.lenderAccounts = this.lenders.getLenderAccounts(this.lenderProfileId);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  // tslint:disable-next-line: typedef
  onSelect() {
    this.router.navigate(['admin/createlenderaccount', this.lenderProfileId]);
  }

  /**
   * When clicked, navigates to the Account Details page
   * which provides details on the selected Lender Account
   * @param lenderAccount selected Lender Account
   */
  // tslint:disable-next-line: typedef
  lenderAccountDetails(lenderAccount){
    this.router.navigate(['admin/accountdetails', lenderAccount.accountNumber]);
  }

}
