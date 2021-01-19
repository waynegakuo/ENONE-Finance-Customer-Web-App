import { SharedModule } from './../../shared/modules/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolsRoutingModule } from './tools-routing.module';
import { ToolsComponent } from './tools.component';


@NgModule({
  declarations: [ToolsComponent],
  imports: [
    CommonModule,
    ToolsRoutingModule,
    SharedModule
  ]
})
export class ToolsModule { }
