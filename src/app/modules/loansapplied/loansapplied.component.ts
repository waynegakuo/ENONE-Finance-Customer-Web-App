import { Subscription } from 'rxjs';
import { LoansappliedService } from './../../admin/services/loansapplied/loansapplied.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-loansapplied',
  templateUrl: './loansapplied.component.html',
  styleUrls: ['./loansapplied.component.scss']
})
export class LoansappliedComponent implements OnInit, OnDestroy {
  loans;
  subs: Subscription;
  availableLoans: boolean;
  searchText = '';

  constructor(private allLoansService: LoansappliedService, private router: Router) { }

  ngOnInit(): void {
    this.subs = this.allLoansService.getAllLoans().subscribe(
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

  /**
   * Method used to filter data by name
   * @param loan loan passed as parameter
   */
  // tslint:disable-next-line: typedef
  filterCondition(loan) {
    return loan.userDisplayName.toLowerCase().indexOf(this.searchText.toLowerCase()) !== -1;
  }

  // tslint:disable-next-line: typedef
  onSelect(loan) {
    this.router.navigate(['admin/loansapplied', loan.loanId]);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
