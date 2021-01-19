import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoanApplicationDetailsComponent } from './loan-application-details.component';

const routes: Routes = [{ path: '', component: LoanApplicationDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoanApplicationDetailsRoutingModule { }
