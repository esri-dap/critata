import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapArcgisComponent } from './map-arcgis.component';

@NgModule({
  declarations: [MapArcgisComponent],
  imports: [
    CommonModule
  ],
  exports: [MapArcgisComponent],
})
export class MapArcgisModule { }
