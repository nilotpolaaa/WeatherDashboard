import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
// import { CyclonesModule } from './cyclones/cyclones.module';
// import { DroughtModule } from './drought/drought.module';
// import { ExtremeWeatherModule } from './extreme-weather/extreme-weather.module';
// import { FlowForecastModule } from './flow-forecast/flow-forecast.module';
// import { DrinkingWaterStressModule } from './drinking-water-stress/drinking-water-stress.module';
import { GeoportalComponent } from './geoportal/geoportal.component';
import { GeoportalModule } from './geoportal/geoportal.module';
import { ExtremeWeatherModule } from './geoportal/extreme-weather/extreme-weather.module';
import {AngularSplitModule} from 'angular-split';
@NgModule({
  declarations: [
    AppComponent,
    GeoportalComponent, 
  ],
  imports: [
    SharedModule,
    GeoportalModule,
    ExtremeWeatherModule,
    // CyclonesModule,
    // DroughtModule,
    // ExtremeWeatherModule,
    // FlowForecastModule,
    // DrinkingWaterStressModule,
    BrowserModule,
    AngularSplitModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
