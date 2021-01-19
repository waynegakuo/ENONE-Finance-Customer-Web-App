import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoanProductsComponent } from './loan-products.component';

const routes: Routes = [{ path: '', component: LoanProductsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoanProductsRoutingModule { }
