import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RepaidLoansComponent } from './repaid-loans.component';

const routes: Routes = [{ path: '', component: RepaidLoansComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepaidLoansRoutingModule { }
