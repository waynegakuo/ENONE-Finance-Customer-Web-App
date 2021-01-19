import { Subscription } from 'rxjs';
import { LoanService } from './../../shared/services/loan/loan.service';
import { LoanHistory } from './../../shared/models/loans';
import { Component, OnInit, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-loan-history',
  templateUrl: './loan-history.component.html',
  styleUrls: ['./loan-history.component.scss']
})
export class LoanHistoryComponent implements OnInit, OnDestroy {
  subs: Subscription;
  loans: [];
  availableLoans: boolean;

  loanViewSection = false;
  loanItem;
  date = this.formatDate(new Date());
  day = this.formatDay(new Date());
  month = this.formatMonth(new Date());
  year = this.formatYear(new Date());

  constructor(private loanService: LoanService) { }

  displayedColumns: string[] = ['date', 'type', 'status', 'amount'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;

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

  ngOnDestroy(): void {
    if (this.availableLoans) {
      this.subs.unsubscribe();
    }
  }

  // tslint:disable-next-line: typedef
  loanView(event, loan) {
    this.loanViewSection = !this.loanViewSection;
    this.loanItem = loan;
  }

  // tslint:disable-next-line: typedef
  exportToExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `Loan_Statement_${this.date}.xlsx`);
  }

  // Attaching a new function  formatDate()  to any instance of Date() class
  // tslint:disable-next-line: typedef
  formatDate(date) {
    if (date !== undefined && date !== '') {
      const myDate = new Date(date);
      const month = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ][myDate.getMonth()];
      const str = myDate.getDate() + ' ' + month + ' ' + myDate.getFullYear();
      return str;
    }
    return '';
  }

  // tslint:disable-next-line: typedef
  formatDay(date) {
    if (date !== undefined && date !== '') {
      const myDate = new Date(date);
      const str = myDate.getDate();
      return str;
    }
    return '';
  }

  // tslint:disable-next-line: typedef
  formatMonth(date) {
    if (date !== undefined && date !== '') {
      const myDate = new Date(date);
      const month = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ][myDate.getMonth()];
      const str = month;
      return str;
    }
    return '';
  }

  // tslint:disable-next-line: typedef
  formatYear(date) {
    if (date !== undefined && date !== '') {
      const myDate = new Date(date);
      const str = myDate.getFullYear();
      return str;
    }
    return '';
  }
}
