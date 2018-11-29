import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SceneArcgisComponent } from './scene-arcgis.component';

@NgModule({
  declarations: [
    SceneArcgisComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [SceneArcgisComponent],
})
export class SceneArcgisModule { }
