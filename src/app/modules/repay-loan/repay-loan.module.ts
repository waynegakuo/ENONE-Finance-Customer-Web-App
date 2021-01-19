import { SharedModule } from './../../shared/modules/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RepayLoanRoutingModule } from './repay-loan-routing.module';
import { RepayLoanComponent } from './repay-loan.component';


@NgModule({
  declarations: [RepayLoanComponent],
  imports: [
    CommonModule,
    RepayLoanRoutingModule,
    SharedModule
  ]
})
export class RepayLoanModule { }
