import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoanHistoryComponent } from './loan-history.component';

const routes: Routes = [{ path: '', component: LoanHistoryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoanHistoryRoutingModule { }
