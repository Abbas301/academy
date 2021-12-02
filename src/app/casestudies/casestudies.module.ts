import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CasestudiesRoutingModule } from './casestudies-routing.module';
import { CasestudiesComponent } from './casestudies/casestudies.component';
import { SharedModule } from '../shared/shared.module';
import { CasestudiesfilterPipe } from './casestudiesfilter.pipe';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CasestudiesComponent,
    CasestudiesfilterPipe
  ],
  imports: [
    CommonModule,
    CasestudiesRoutingModule,
    SharedModule,
    FormsModule

  ]
})
export class CasestudiesModule { }
