import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainersRoutingModule } from './trainers-routing.module';
import { TrainersComponent } from './trainers/trainers.component';
import { SharedModule } from '../shared/shared.module';
import { TrainerfilterPipe } from '../trainerfilter.pipe';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TrainersComponent,
    TrainerfilterPipe
  ],
  imports: [
    CommonModule,
    TrainersRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class TrainersModule { }
