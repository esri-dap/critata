import { Component, OnInit,  } from '@angular/core';

import { loadModules } from "esri-loader";
import { MapStateService } from "../../@core/data/mapstate.service";

@Component({
  selector: 'map-basemap',
  styleUrls: ['./basemap.component.scss'],
  templateUrl: './basemap.component.html',
})

export class MapBasemapComponent implements OnInit {

  constructor(private mapStateService: MapStateService) {
    //
  }

  ngOnInit() {
    this.initWidget_Basemap();
  }

  async initWidget_Basemap() {
    try {
      const [
        EsriWidgetBasemap,
      ] = await loadModules([
        "esri/widgets/BasemapGallery",
      ],);
      
      // Import MapView
      this.mapStateService.listen_esriMapView().subscribe((mapView: any) => {

        let basemap = new EsriWidgetBasemap({
          view: mapView,
          container: "basemap"
        });

      });
      
    } catch (error) {
      console.log("Basemap Widget failed to load, error : " + error);
    }
  }
   
}