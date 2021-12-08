import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarRoutingModule } from './calendar-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TablefilterPipe } from './tablefilter.pipe';
import { CalendarComponent } from './calendar/calendar.component';

import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    CalendarComponent,
    TablefilterPipe
  ],
  imports: [
    MatSelectModule,
    CommonModule,
    CalendarRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class CalendarModule { }
