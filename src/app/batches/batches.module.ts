import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BatchesRoutingModule } from './batches-routing.module';
import { BatchesComponent } from './batches/batches.component';
import { SharedModule } from '../shared/shared.module';
import { CandidateComponent } from './candidate/candidate.component';
import { CandidatelistComponent } from './candidatelist/candidatelist.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { BatchfilterPipe } from './batchfilter.pipe';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';


@NgModule({
  declarations: [
    BatchesComponent,
    CandidateComponent,
    CandidatelistComponent,
    BatchfilterPipe
  ],
  imports: [
    CommonModule,
    BatchesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgCircleProgressModule
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }]
})
export class BatchesModule { }
