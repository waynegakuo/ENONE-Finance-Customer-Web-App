import { SharedModule } from './../../../shared/modules/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoanApplicationDetailsRoutingModule } from './loan-application-details-routing.module';
import { LoanApplicationDetailsComponent } from './loan-application-details.component';


@NgModule({
  declarations: [LoanApplicationDetailsComponent],
  imports: [
    CommonModule,
    LoanApplicationDetailsRoutingModule,
    SharedModule
  ]
})
export class LoanApplicationDetailsModule { }
