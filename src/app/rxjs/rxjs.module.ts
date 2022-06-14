import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RxjsRoutingModule } from './rxjs-routing.module';
import { RxjsComponent } from './rxjs.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RxjsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RxjsRoutingModule
  ]
})
export class RxjsModule { }
