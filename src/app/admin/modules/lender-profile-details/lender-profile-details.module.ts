import { SharedModule } from './../../../shared/modules/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LenderProfileDetailsRoutingModule } from './lender-profile-details-routing.module';
import { LenderProfileDetailsComponent } from './lender-profile-details.component';


@NgModule({
  declarations: [LenderProfileDetailsComponent],
  imports: [
    CommonModule,
    LenderProfileDetailsRoutingModule,
    SharedModule
  ]
})
export class LenderProfileDetailsModule { }
