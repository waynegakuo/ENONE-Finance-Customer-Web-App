import { LenderService } from './../../services/lender/lender.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-lender-account',
  templateUrl: './add-lender-account.component.html',
  styleUrls: ['./add-lender-account.component.scss']
})
export class AddLenderAccountComponent implements OnInit {
  subs: Subscription;
  lenderProfileId;
  loanPayable;
  repaymentAmount;
  loanActualEnDate;


  constructor(private route: ActivatedRoute, public lenders: LenderService) { }

  ngOnInit(): void {
    // Getting Lender Profile ID from the route parameter
    this.subs = this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');
      this.lenderProfileId = id;

      console.log(this.lenderProfileId);
    });
  }

  /**
   * Calls the createLenderAccount function from the
   * Lender service and passes the captured lender profile Id
   * and adds it as one of the fields to be saved together with
   * the other lender account details to the database
   */
  // tslint:disable-next-line: typedef
  createAccount() {
    this.lenders.createLenderAccount(this.lenderProfileId);
  }

  /**
   * Calls the calulateLoanPayable function from the
   * Lender Service and returns the amount to be paid;
   */
  // tslint:disable-next-line: typedef
  calculateLoanPay(){
    const [totalLoanPayable, monthlyPayment, loanActualEndDate] = this.lenders.calculateLoanPayable(); // Destructuring
    this.loanPayable = totalLoanPayable;
    this.repaymentAmount = monthlyPayment;
    this.loanActualEnDate = loanActualEndDate;
    this.lenders.updateTotalLoanPayable(this.loanPayable, this.repaymentAmount, this.loanActualEnDate);
  }
}
