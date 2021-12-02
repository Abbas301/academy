import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BatchesComponent } from './batches/batches.component';
import { CandidateComponent } from './candidate/candidate.component';
import { CandidatelistComponent } from './candidatelist/candidatelist.component';

const routes: Routes = [
  {
    path:'', component: BatchesComponent
  },
  {path:'candidate',component:CandidateComponent},
  {path:'candidatelist',component:CandidatelistComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BatchesRoutingModule { }
