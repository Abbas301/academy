import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from './shared/shared.module';
import { SidenavComponent } from './sidenav/sidenav.component';
import { TrainersModule } from './trainers/trainers.module';
import { OnboardModule } from './onboard/onboard.module';
import { CasestudiesModule } from './casestudies/casestudies.module';
import { CalendarModule } from './calender/calendar.module';
import { BatchesModule } from './batches/batches.module';
import { HttpClientModule } from '@angular/common/http';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ToastrModule } from 'ngx-toastr';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    TrainersModule,
    OnboardModule,
    CasestudiesModule,
    CalendarModule,
    BatchesModule,
    HttpClientModule,
    ToastrModule,
    NgCircleProgressModule.forRoot({
      radius: 100,
      outerStrokeWidth: 25,
      outerStrokeColor: "#78C000",
      showInnerStroke:true
    }),
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: false,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
