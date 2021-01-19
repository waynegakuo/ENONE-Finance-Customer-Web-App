import { SharedModule } from './../../shared/modules/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplyLoanRoutingModule } from './apply-loan-routing.module';
import { ApplyLoanComponent } from './apply-loan.component';


@NgModule({
  declarations: [ApplyLoanComponent],
  imports: [
    CommonModule,
    ApplyLoanRoutingModule,
    SharedModule
  ]
})
export class ApplyLoanModule { }
