import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DashboardService } from 'src/app/admin/services/dashboard.service';
import { ClientService } from 'src/app/admin/services/mifos/client/client.service';
import { LoanServiceMifos } from 'src/app/admin/services/mifos/loan/loan.service';

@Component({
  selector: 'app-admin-overview',
  templateUrl: './admin-overview.component.html',
  styleUrls: ['./admin-overview.component.scss']
})
export class AdminOverviewComponent implements OnInit, OnDestroy {
  bigChart = [];
  cards = [];
  pieChart = [];

  // Obtaining details for clients and loans from MIFOS
  subs: Subscription;
  clients;
  loans;

  constructor(private dashboardService: DashboardService, private clientService: ClientService, private loanService: LoanServiceMifos) { }

  ngOnInit(): void {
    // Getting total number of clients from MIFOS
    this.subs = this.clientService.getAllClients().subscribe(a => {
      this.clients = a.data.totalFilteredRecords;
    });

    // Getting total number of loans from MIFOS
    this.subs = this.loanService.getAllLoans().subscribe(a => {
      this.loans = a.data.totalFilteredRecords;
    });

    this.bigChart = this.dashboardService.bigChart();
    this.cards = this.dashboardService.cards();
    this.pieChart = this.dashboardService.pieChart();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
