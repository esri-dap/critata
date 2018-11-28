import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { PetaThreeDComponent } from './petaThreeD.component';
import { MapArcgisModule } from './../../map-arcgis/map-arcgis.module';

@NgModule({
  imports: [
    ThemeModule,
    MapArcgisModule,
  ],
  declarations: [
    PetaThreeDComponent,
  ],
})
export class PetaThreeDModule { }
