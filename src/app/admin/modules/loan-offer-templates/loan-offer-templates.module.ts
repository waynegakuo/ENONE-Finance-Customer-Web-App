import { SharedModule } from './../../../shared/modules/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoanOfferTemplatesRoutingModule } from './loan-offer-templates-routing.module';
import { LoanOfferTemplatesComponent } from './loan-offer-templates.component';


@NgModule({
  declarations: [LoanOfferTemplatesComponent],
  imports: [
    CommonModule,
    LoanOfferTemplatesRoutingModule,
    SharedModule
  ]
})
export class LoanOfferTemplatesModule { }
