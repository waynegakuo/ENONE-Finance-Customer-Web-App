import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoanStatusComponent } from './loan-status.component';

const routes: Routes = [{ path: '', component: LoanStatusComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoanStatusRoutingModule { }
