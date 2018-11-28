// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'map-arcgis',
//   templateUrl: './map-arcgis.component.html',
//   styleUrls: ['./map-arcgis.component.scss']
// })
// export class MapArcgisComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }

/*
  Copyright 2018 Esri
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { loadModules } from 'esri-loader';
import esri = __esri;

@Component({
  selector: 'map-arcgis',
  templateUrl: './map-arcgis.component.html',
  styleUrls: ['./map-arcgis.component.css']
})
export class MapArcgisComponent implements OnInit {

  @Output() mapLoaded = new EventEmitter<boolean>();
  @ViewChild('mapViewNode') private mapViewEl: ElementRef;

  /**
   * @private _zoom sets map zoom
   * @private _center sets map center
   * @private _basemap sets type of map
   */
  private _zoom: number = 10;
  private _center: Array<number> = [-6.175, 106.825];
  private _basemap: string = 'streets';
  private _webmap: string = "a762c0e234a94af99cf8c2a0c835f7d4";
  private coordinate: number[] = [null, null]

  @Input()
  set zoom(zoom: number) {
    this._zoom = zoom;
  }

  get zoom(): number {
    return this._zoom;
  }

  @Input()
  set center(center: Array<number>) {
    this._center = center;
  }

  get center(): Array<number> {
    return this._center;
  }

  @Input()
  set basemap(basemap: string) {
    this._basemap = basemap;
  }

  get basemap(): string {
    return this._basemap;
  }

  @Input()
  set webmap(webmap: string) {
    this._webmap = webmap;
  }

  get webmap(): string {
    return this._webmap;
  }

  constructor() { }

  async initializeMap() {
    try {
      const [EsriMapView, EsriWebMap, EsriConfig, EsriWebMercator] = await loadModules([
        'esri/views/MapView',
        'esri/WebMap',
        'esri/config',
        'esri/geometry/support/webMercatorUtils'
      ]);

      const esriConfig: esri.config = EsriConfig

      esriConfig.portalUrl = "http://jakartasatu.jakarta.go.id/portal"

      const webmapProperties: esri.WebMapProperties = {
        portalItem: { 
          id: this._webmap,
        }
      }

      const webmap: esri.WebMap = new EsriWebMap(webmapProperties);

      // Set type of map
      // const mapProperties: esri.MapProperties = {
      //   basemap: this._basemap
      // };

      // const map: esri.Map = new EsriMap(mapProperties);

      // Set type of map view
      const mapViewProperties: esri.MapViewProperties = {
        container: this.mapViewEl.nativeElement,
        // center: this._center,
        // zoom: this._zoom,
        map: webmap,
      };

      const mapView: esri.MapView = new EsriMapView(mapViewProperties);

      // All resources in the MapView and the map have loaded.
      // Now execute additional processes

      mapView.when(() => {
        this.mapLoaded.emit(true);
        console.log(this.coordinate)
        mapView.goTo({center: this.coordinate})
      });

      mapView.on("drag", (evt)=>{
        if(evt.action == "end"){
          let {x, y} = EsriWebMercator.webMercatorToGeographic(mapView.toMap({x: evt.x, y: evt.y}))
          this.coordinate = [y, x]
          console.log(this.coordinate)
        }
       });

    } catch (error) {
      console.log('We have an error: ' + error);
    }

  }

  ngOnInit() {
    this.initializeMap();
  }

}