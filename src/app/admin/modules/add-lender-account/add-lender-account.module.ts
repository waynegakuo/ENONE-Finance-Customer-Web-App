import { SharedModule } from './../../../shared/modules/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddLenderAccountRoutingModule } from './add-lender-account-routing.module';
import { AddLenderAccountComponent } from './add-lender-account.component';


@NgModule({
  declarations: [AddLenderAccountComponent],
  imports: [
    CommonModule,
    AddLenderAccountRoutingModule,
    SharedModule
  ]
})
export class AddLenderAccountModule { }
