import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnboardRoutingModule } from './onboard-routing.module';
import { OnboardComponent } from './onboard/onboard.component';
import { SharedModule } from '../shared/shared.module';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';



@NgModule({
  declarations: [
    OnboardComponent,
  ],
  imports: [
    CommonModule,
    OnboardRoutingModule,
    SharedModule
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }]
})
export class OnboardModule { }
