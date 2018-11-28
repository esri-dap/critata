import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { PetaExistingComponent } from './petaExisting.component';
import { MapArcgisModule } from './../../map-arcgis/map-arcgis.module';

@NgModule({
  imports: [
    ThemeModule,
    MapArcgisModule,
  ],
  declarations: [
    PetaExistingComponent,
  ],
})
export class PetaExistingModule { }
