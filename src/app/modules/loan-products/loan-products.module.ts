import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoanProductsRoutingModule } from './loan-products-routing.module';
import { LoanProductsComponent } from './loan-products.component';


@NgModule({
  declarations: [LoanProductsComponent],
  imports: [
    CommonModule,
    LoanProductsRoutingModule
  ]
})
export class LoanProductsModule { }
