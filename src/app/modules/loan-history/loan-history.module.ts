import { SharedModule } from './../../shared/modules/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoanHistoryRoutingModule } from './loan-history-routing.module';
import { LoanHistoryComponent } from './loan-history.component';


@NgModule({
  declarations: [LoanHistoryComponent],
  imports: [
    CommonModule,
    LoanHistoryRoutingModule,
    SharedModule
  ]
})
export class LoanHistoryModule { }
