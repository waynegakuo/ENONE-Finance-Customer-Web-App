import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RepayLoanComponent } from './repay-loan.component';

const routes: Routes = [{ path: '', component: RepayLoanComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepayLoanRoutingModule { }
