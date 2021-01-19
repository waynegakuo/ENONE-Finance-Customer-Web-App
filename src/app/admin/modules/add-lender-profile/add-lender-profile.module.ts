import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddLenderProfileRoutingModule } from './add-lender-profile-routing.module';
import { AddLenderProfileComponent } from './add-lender-profile.component';
import { SharedModule } from 'src/app/shared/modules/shared/shared.module';


@NgModule({
  declarations: [AddLenderProfileComponent],
  imports: [
    CommonModule,
    AddLenderProfileRoutingModule,
    SharedModule
  ]
})
export class AddLenderProfileModule { }
