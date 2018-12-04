import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserService } from './users.service';
import { StateService } from './state.service';
import { MapStateService } from './mapstate.service'
import { AttachmentService } from './attachment.service'
// import { LaporanService } from './laporan.service'
import { SearchService } from './search.service'

const SERVICES = [
  UserService,
  StateService,
  MapStateService,
  AttachmentService,
  SearchService,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    ...SERVICES,
  ],
})
export class DataModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: DataModule,
      providers: [
        ...SERVICES,
      ],
    };
  }
}
