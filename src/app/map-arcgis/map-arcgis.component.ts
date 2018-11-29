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

import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter
} from "@angular/core";
import { loadModules } from "esri-loader";

import { MapStateService } from "../@core/data/mapstate.service";

import esri = __esri;

@Component({
  selector: "map-arcgis",
  templateUrl: "./map-arcgis.component.html",
  styleUrls: ["./map-arcgis.component.css"]
})
export class MapArcgisComponent implements OnInit {
  @Output() mapLoaded = new EventEmitter<boolean>();
  @ViewChild("mapViewNode") private mapViewEl: ElementRef;

  @Output() emitEsriMapView = new EventEmitter();

  /**
   * @private _zoom sets map zoom
   * @private _center sets map center
   * @private _basemap sets type of map
   */
  private _zoom: number = 15;
  private _center: Array<number> = [-6.175642711255031, 106.8251880714399];
  private _basemap: string = "streets";
  private _webmap: string = "0e9ca7fffb2f44f1a9433e80aa0223da";
  private _coordinate: Array<number> = [null, null]
  // esriMapView: any;

  _subcriptionMapCenter: any;

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

  // @Input()
  // set coordinate(coordinate: Array<number>) {
  //   this._coordinate = coordinate;
  // }

  // get coordinate(): Array<number> {
  //   return this._coordinate;
  // }

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

  constructor(private mapStateService: MapStateService) {
    // console.log("coordlist", this._coordinate)
  }

  async initializeMap() {
    try {
      const [
        EsriMapView,
        EsriWebMap,
        EsriConfig,
        EsriWebMercator,
        EsriWidgetLegend,
        EsriWidgetBasemap,
        EsriWidgetLocate,
        EsriWidgetHome,
        EsriWidgetZoom
      ] = await loadModules([
        "esri/views/MapView",
        "esri/WebMap",
        "esri/config",
        "esri/geometry/support/webMercatorUtils",
        "esri/widgets/Legend",
        "esri/widgets/BasemapGallery",
        "esri/widgets/Locate",
        "esri/widgets/Home",
        "esri/widgets/Zoom"
      ]);

      const esriConfig: esri.config = EsriConfig;

      esriConfig.portalUrl = "http://jakartasatu.jakarta.go.id/portal";

      const webmapProperties: esri.WebMapProperties = {
        portalItem: {
          id: this._webmap
        }
      };

      const webmap: esri.WebMap = new EsriWebMap(webmapProperties);

      // Set type of map
      // const mapProperties: esri.MapProperties = {
      //   basemap: this._basemap
      // };

      // const map: esri.Map = new EsriMap(mapProperties);

      // Set type of map view
      const mapViewProperties: esri.MapViewProperties = {
        container: this.mapViewEl.nativeElement,
        // center: this._coordinate,
        zoom: this._zoom,
        map: webmap
      };

      const esriMapView: esri.MapView = new EsriMapView(mapViewProperties);

      // All resources in the MapView and the map have loaded.
      // Now execute additional processes

      // this._subcriptionMapCenter = this.mapStateService.execChange_locationpoint.subscribe((value) => {
      //   console.log("mapcoomp-coord", value);
      //   this._coordinate = value; // this.username will hold your value and modify it every time it changes
      // });

      esriMapView.when(() => {
        this.mapLoaded.emit(true);
        // this.emitEsriMapView.emit(esriMapView);
        this.mapStateService.stateEsriMapView(esriMapView);
        // esriMapView.goTo
      });

      let legend = new EsriWidgetLegend({
        view: esriMapView,
        container: "legend"
      });

      let basemap = new EsriWidgetBasemap({
        view: esriMapView,
        container: "basemap"
      });

      let locate = new EsriWidgetLocate({
        view: esriMapView,
        container: "locate"
      });

      let home = new EsriWidgetHome({
        view: esriMapView,
        container: "home"
      });

      let zoom = new EsriWidgetZoom({
        view: esriMapView,
        container: "zoom"
      })

      // esriMapView.on("click", (event) => {
      //   console.log("onclick", event);
      //   let {x, y} = EsriWebMercator.webMercatorToGeographic(esriMapView.toMap({x: event.x, y: event.y}))
      //   this._coordinate = [y, x]
      //   this.mapStateService.updateLocationPoint(this._coordinate)
      //   console.log("click-coordinate", this._coordinate);
      // })

      // esriMapView.on("drag", (evt)=>{
      //   if(evt.action == "end"){
      //     let {x, y} = EsriWebMercator.webMercatorToGeographic(esriMapView.toMap({x: evt.x, y: evt.y}))
      //     this._coordinate = [y, x]
      //     this.mapStateService.updateLocationPoint(this._coordinate)
      //     console.log("drag-coordinate", this._coordinate)
      //   }
      // });

      esriMapView.on("click", evt => {
        console.log(
          esriMapView.popup.title,
          esriMapView.popup.selectedFeature,
          esriMapView.popup
        );
      });
    } catch (error) {
      console.log("We have an error: " + error);
    }
  }

  // async initSceneView() {
  //   try {
  //     const [EsriMapView, EsriWebMap, EsriConfig, EsriWebMercator] = await loadModules([
  //       'esri/views/MapView',
  //       'esri/WebMap',
  //       'esri/config',
  //       'esri/geometry/support/webMercatorUtils'
  //     ]);

  //     const esriConfig: esri.config = EsriConfig

  //     esriConfig.portalUrl = "http://jakartasatu.jakarta.go.id/portal"

  //     const webmapProperties: esri.WebMapProperties = {
  //       portalItem: {
  //         id: this._webmap,
  //       }
  //     }

  //     const webmap: esri.WebMap = new EsriWebMap(webmapProperties);

  //     // Set type of map
  //     // const mapProperties: esri.MapProperties = {
  //     //   basemap: this._basemap
  //     // };

  //     // const map: esri.Map = new EsriMap(mapProperties);

  //     // Set type of map view
  //     const mapViewProperties: esri.MapViewProperties = {
  //       container: this.mapViewEl.nativeElement,
  //       // center: this._coordinate,
  //       zoom: this._zoom,
  //       map: webmap,
  //     };

  //     const esriMapView: esri.MapView = new EsriMapView(mapViewProperties);

  //     // All resources in the MapView and the map have loaded.
  //     // Now execute additional processes

  //     // this._subcriptionMapCenter = this.mapStateService.execChange_locationpoint.subscribe((value) => {
  //     //   console.log("mapcoomp-coord", value);
  //     //   this._coordinate = value; // this.username will hold your value and modify it every time it changes
  //     // });

  //     esriMapView.when(() => {
  //       this.mapLoaded.emit(true);
  //       // esriMapView.goTo
  //     });

  //     esriMapView.on("click", (event) => {
  //       console.log("onclick", event);
  //       let {x, y} = EsriWebMercator.webMercatorToGeographic(esriMapView.toMap({x: event.x, y: event.y}))
  //       this._coordinate = [y, x]
  //       this.mapStateService.updateLocationPoint(this._coordinate)
  //       console.log("click-coordinate", this._coordinate);
  //     })

  //     esriMapView.on("drag", (evt)=>{
  //       if(evt.action == "end"){
  //         let {x, y} = EsriWebMercator.webMercatorToGeographic(esriMapView.toMap({x: evt.x, y: evt.y}))
  //         this._coordinate = [y, x]
  //         this.mapStateService.updateLocationPoint(this._coordinate)
  //         console.log("drag-coordinate", this._coordinate)
  //       }
  //      });

  //   } catch (error) {
  //     console.log('We have an error: ' + error);
  //   }
  // }

  ngOnInit() {
    this.initializeMap();
  }
}
