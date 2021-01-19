import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LenderProfileDetailsComponent } from './lender-profile-details.component';

const routes: Routes = [{ path: '', component: LenderProfileDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LenderProfileDetailsRoutingModule { }
