import { SharedModule } from './../../../shared/modules/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LenderprofilesRoutingModule } from './lenderprofiles-routing.module';
import { LenderprofilesComponent } from './lenderprofiles.component';


@NgModule({
  declarations: [LenderprofilesComponent],
  imports: [
    CommonModule,
    LenderprofilesRoutingModule,
    SharedModule
  ]
})
export class LenderprofilesModule { }
