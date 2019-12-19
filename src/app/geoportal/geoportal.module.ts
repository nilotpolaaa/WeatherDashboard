import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtremeWeatherComponent } from './extreme-weather/extreme-weather.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [ExtremeWeatherComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class GeoportalModule { }
