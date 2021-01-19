import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LenderprofilesComponent } from './lenderprofiles.component';

const routes: Routes = [
  {
    path: '', component: LenderprofilesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LenderprofilesRoutingModule { }
