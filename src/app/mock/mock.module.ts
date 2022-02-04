import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MockRoutingModule } from './mock-routing.module';
import { MockComponent } from './mock.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    MockComponent
  ],
  imports: [
    CommonModule,
    MockRoutingModule,
    SharedModule
  ]
})
export class MockModule { }
