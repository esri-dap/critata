import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
// import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { PetaExistingModule } from './petaExisting/petaExisting.module'
import { PetaRencanaModule } from './petaRencana/petaRencana.module'
import { PetaThreeDModule } from './petaThreeD/petaThreeD.module';


const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    MiscellaneousModule,
    PetaExistingModule,
    PetaRencanaModule,
    PetaThreeDModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
})
export class PagesModule {
}
