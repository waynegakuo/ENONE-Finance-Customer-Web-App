import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoanHistory } from 'src/app/shared/models/loans';
import { LoanService } from 'src/app/shared/services/loan/loan.service';
import { PaymentsService } from 'src/app/shared/services/payments/payments.service';
import { FormBuilder, Validators, FormArray, FormGroup, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-repay-loan',
  templateUrl: './repay-loan.component.html',
  styleUrls: ['./repay-loan.component.scss']
})
export class RepayLoanComponent implements OnInit {
  subs: Subscription;
  loans: [];
  availableLoans: boolean;

  loanViewSection = false;
  loanItem;

  constructor(private loanService: LoanService, public loanRepay: PaymentsService, private fb: FormBuilder) { }

  // Form to gather details for loan repayment
  loanRepayForm = this.fb.group({
    phoneNumber: ['', Validators.required],
    amount: ['', Validators.required]
  });

  ngOnInit(): void {
    this.subs = this.loanService.getLoans().subscribe(
      data => {
        this.loans = data;

        if (this.loans.length === 0) {
          this.availableLoans = false;
        }
        else {
          this.availableLoans = true;
        }
      }
    );
  }

  // tslint:disable-next-line: typedef
  loanView(event, loan) {
    this.loanViewSection = !this.loanViewSection;
    this.loanItem = loan;
  }

  // tslint:disable-next-line: typedef
  repayLoan() {
    const bodyData = {
      userId: 'moose-24',
      phone: `${this.loanRepayForm.controls.phoneNumber.value}`,
      amount: `${this.loanRepayForm.controls.amount.value}`
    };

    this.loanRepay.payLoan(bodyData).subscribe(data => {
      console.log(data);
    });
  }

}
