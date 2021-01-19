import { SharedModule } from './../../shared/modules/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoansappliedRoutingModule } from './loansapplied-routing.module';
import { LoansappliedComponent } from './loansapplied.component';


@NgModule({
  declarations: [LoansappliedComponent],
  imports: [
    CommonModule,
    LoansappliedRoutingModule,
    SharedModule
  ]
})
export class LoansappliedModule { }
