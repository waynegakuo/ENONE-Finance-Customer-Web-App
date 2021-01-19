import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminOverviewComponent } from './admin-overview.component';

const routes: Routes = [{ path: '', component: AdminOverviewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminOverviewRoutingModule { }
