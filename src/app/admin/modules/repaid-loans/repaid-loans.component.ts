import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PaymentsService } from 'src/app/shared/services/payments/payments.service';

@Component({
  selector: 'app-repaid-loans',
  templateUrl: './repaid-loans.component.html',
  styleUrls: ['./repaid-loans.component.scss']
})
export class RepaidLoansComponent implements OnInit, OnDestroy {
  searchText = '';
  repayments;
  subs: Subscription;
  availableRepayments: boolean;

  constructor(private repaidLoans: PaymentsService) { }

  ngOnInit(): void {
    this.subs = this.repaidLoans.getRepayments().subscribe(
      data => {
        this.repayments = data;
        if (this.repayments.length === 0) {
          this.availableRepayments = false;
        }
        else {
          this.availableRepayments = true;
        }
      });
  }

  /**
   * Method used to filter data by name
   * @param loan loan passed as parameter
   */
  // tslint:disable-next-line: typedef
  filterCondition(repaidLoan) {
    return repaidLoan.name.toLowerCase().indexOf(this.searchText.toLowerCase()) !== -1;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
