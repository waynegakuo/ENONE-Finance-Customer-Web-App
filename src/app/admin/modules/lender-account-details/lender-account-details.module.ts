import { SharedModule } from './../../../shared/modules/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LenderAccountDetailsRoutingModule } from './lender-account-details-routing.module';
import { LenderAccountDetailsComponent } from './lender-account-details.component';


@NgModule({
  declarations: [LenderAccountDetailsComponent],
  imports: [
    CommonModule,
    LenderAccountDetailsRoutingModule,
    SharedModule
  ]
})
export class LenderAccountDetailsModule { }
