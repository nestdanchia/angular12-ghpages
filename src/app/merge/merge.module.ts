import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MergeRoutingModule } from './merge-routing.module';
import { MergeComponent } from './merge.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    MergeComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MergeRoutingModule
  ]
})
export class MergeModule { }
