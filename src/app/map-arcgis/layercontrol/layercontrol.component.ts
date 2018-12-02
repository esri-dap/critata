import { Component, OnInit,  } from '@angular/core';

import { loadModules } from "esri-loader";
import { MapStateService } from "../../@core/data/mapstate.service";

@Component({
  selector: 'map-layercontrol',
  styleUrls: ['./layercontrol.component.scss'],
  templateUrl: './layercontrol.component.html',
})

export class MapLayerControlComponent implements OnInit {

  constructor(private mapStateService: MapStateService) {
    //
  }

  ngOnInit() {
    this.initWidget_LayerList();
  }

  async initWidget_LayerList() {
    try {
      const [
        EsriWidgetLayerList,
      ] = await loadModules([
        "esri/widgets/LayerList",
      ],);
      
      // Import MapView
      this.mapStateService.listen_esriMapView().subscribe((mapView: any) => {

        let layer = new EsriWidgetLayerList({
          view: mapView,
          container: "layer"
        });

      });
      
    } catch (error) {
      console.log("LayerControl Widget failed to load, error : " + error);
    }
  }
   
}