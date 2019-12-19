import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { SideNavBarComponent } from './shared/side-nav-bar/side-nav-bar.component';
import { GeoportalComponent } from './geoportal/geoportal.component';
import { RainfallComponent } from './geoportal/extreme-weather/rainfall/rainfall.component';
import { HumidityComponent } from './geoportal/extreme-weather/humidity/humidity.component';
import { TemperatureComponent } from './geoportal/extreme-weather/temperature/temperature.component';
import { WindSpeedComponent } from './geoportal/extreme-weather/wind-speed/wind-speed.component';

const routes: Routes = [
  { path : '', component: FooterComponent, outlet : 'footer'},
  { path : '', component: HeaderComponent, outlet: 'header'},
  { path : '', component: SideNavBarComponent, outlet: 'sidenavbar'},
  { path : 'extremeweather/rainfall', component: RainfallComponent},
  { path : 'extremeweather/humidity', component: HumidityComponent},
  { path : 'extremeweather/temperature', component: TemperatureComponent},
  { path : 'extremeweather/windspeed', component: WindSpeedComponent},
  { path : 'extremeweather', component: GeoportalComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

  
}
