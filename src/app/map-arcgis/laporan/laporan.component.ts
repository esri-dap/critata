import { Component, OnInit  } from '@angular/core';

import { MapStateService } from "../../@core/data/mapstate.service";

@Component({
  selector: 'map-laporan',
  styleUrls: ['./laporan.component.scss'],
  templateUrl: './laporan.component.html',
})

export class MapLaporanComponent implements OnInit {

  constructor(private mapStateService: MapStateService) {
  }

   ngOnInit() {

   }

   loadLaporanModule() {
    this.mapStateService.listen_esriMapView().subscribe((mapView: any) => {

    

    });
   }
}