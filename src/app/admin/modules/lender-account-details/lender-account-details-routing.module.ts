import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LenderAccountDetailsComponent } from './lender-account-details.component';

const routes: Routes = [{ path: '', component: LenderAccountDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LenderAccountDetailsRoutingModule { }
