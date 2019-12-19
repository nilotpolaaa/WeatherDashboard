import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SideNavBarComponent } from './side-nav-bar/side-nav-bar.component';
import { AppRoutingModule } from '../app-routing.module';
import { MapComponent } from './map/map.component';
import { DataTabComponent } from './data-tab/data-tab.component';


@NgModule({
  declarations: [HeaderComponent, FooterComponent, SideNavBarComponent, MapComponent, DataTabComponent],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: [HeaderComponent, FooterComponent, SideNavBarComponent]
})
export class SharedModule { }
