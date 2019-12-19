import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RainfallComponent } from './rainfall/rainfall.component';
import { TemperatureComponent } from './temperature/temperature.component';
import { HumidityComponent } from './humidity/humidity.component';
import { WindSpeedComponent } from './wind-speed/wind-speed.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [RainfallComponent, TemperatureComponent, HumidityComponent, WindSpeedComponent],
  imports: [
    CommonModule, SharedModule
  ]
})
export class ExtremeWeatherModule { }
