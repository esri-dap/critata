import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { PetaRencanaComponent } from './petaRencana.component';
import { MapArcgisModule } from './../../map-arcgis/map-arcgis.module';

@NgModule({
  imports: [
    ThemeModule,
    MapArcgisModule,
  ],
  declarations: [
    PetaRencanaComponent,
  ],
})
export class PetaRencanaModule { }
