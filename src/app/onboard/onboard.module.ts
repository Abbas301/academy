import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnboardRoutingModule } from './onboard-routing.module';
import { OnboardComponent } from './onboard/onboard.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    OnboardComponent,
  ],
  imports: [
    CommonModule,
    OnboardRoutingModule,
    SharedModule
  ]
})
export class OnboardModule { }
