import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CasestudiesComponent } from './casestudies/casestudies.component';

const routes: Routes = [
  {
    path:'', component: CasestudiesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CasestudiesRoutingModule { }
