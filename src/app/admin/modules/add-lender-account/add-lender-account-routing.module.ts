import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddLenderAccountComponent } from './add-lender-account.component';

const routes: Routes = [{ path: '', component: AddLenderAccountComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddLenderAccountRoutingModule { }
