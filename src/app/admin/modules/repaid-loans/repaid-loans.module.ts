import { SharedModule } from 'src/app/shared/modules/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RepaidLoansRoutingModule } from './repaid-loans-routing.module';
import { RepaidLoansComponent } from './repaid-loans.component';


@NgModule({
  declarations: [RepaidLoansComponent],
  imports: [
    CommonModule,
    RepaidLoansRoutingModule,
    SharedModule
  ]
})
export class RepaidLoansModule { }
