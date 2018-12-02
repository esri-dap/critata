import { Component, OnInit, } from '@angular/core';

import { loadModules } from "esri-loader";
import { MapStateService } from "../../@core/data/mapstate.service";

@Component({
  selector: 'map-legend',
  styleUrls: ['./legend.component.scss'],
  templateUrl: './legend.component.html',
})

export class MapLegendComponent implements OnInit {

  constructor(private mapStateService: MapStateService) {
    //
  }

  ngOnInit() {
    this.initWidget_Legend();
  }

  async initWidget_Legend() {
    try {
      const [
        EsriWidgetLegend,
      ] = await loadModules([
        "esri/widgets/Legend",
      ],);
      
      // Import MapView
      this.mapStateService.listen_esriMapView().subscribe((mapView: any) => {

        let legend = new EsriWidgetLegend({
          view: mapView,
          container: "legend"
        });

      });
      
    } catch (error) {
      console.log("Legend Widget failed to load, error : " + error);
    }
  }
   
}