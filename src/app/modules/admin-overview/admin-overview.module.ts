import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminOverviewRoutingModule } from './admin-overview-routing.module';
import { AdminOverviewComponent } from './admin-overview.component';
import { SharedModule } from './../../shared/modules/shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [AdminOverviewComponent],
  imports: [
    CommonModule,
    AdminOverviewRoutingModule,
    SharedModule,
    FlexLayoutModule
  ]
})
export class AdminOverviewModule { }
