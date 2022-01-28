import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';

const routes: Routes = [
  {path:'',redirectTo:'batches',pathMatch:'full'},
  {
    path: 'batches',
    loadChildren: () => import('./batches/batches.module').then(m => m.BatchesModule)
  },
  {
    path: 'calendar',
    loadChildren: () => import('./calender/calendar.module').then(m => m.CalendarModule)
  },
  {
    path: 'case',
    loadChildren: () => import('./casestudies/casestudies.module').then(m => m.CasestudiesModule)
  },
  {
    path: 'onboard',
    loadChildren: () => import('./onboard/onboard.module').then(m => m.OnboardModule)
  },
  {
    path: 'trainers',
    loadChildren: () => import('./trainers/trainers.module').then(m => m.TrainersModule)
  },
  { path: 'header', component:HeaderComponent},
  {path:'sidenav', component:SidenavComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
