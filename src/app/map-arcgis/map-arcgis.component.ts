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
  @Output() emitPopupData = new EventEmitter<boolean>();

  /**
   * @private _zoom sets map zoom
   * @private _center sets map center
   * @private _basemap sets type of map
   */
  private _zoom: number = 15;
  private _center: Array<number> = [-6.175642711255031, 106.8251880714399];
  private _basemap: string = "streets";
  private _webmap: string = "a762c0e234a94af99cf8c2a0c835f7d4";
  private _coordinate: Array<number> = [null, null];
  // esriMapView: any;

  _subcriptionMapCenter: any;
  _subscriptionMapPopup: any;

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
        EsriFeatureLayer,
        EsriTaskLocator,
        EsriWidgetLegend,
        EsriWidgetBasemap,
        EsriWidgetLocate,
        EsriWidgetHome,
        EsriWidgetZoom,
        EsriWidgetPopup,
        EsriWidgetLayerList,
        EsriWidgetSearch,
        EsriPopupTemplate
      ] = await loadModules([
        "esri/views/MapView",
        "esri/WebMap",
        "esri/config",
        "esri/geometry/support/webMercatorUtils",
        "esri/layers/FeatureLayer",
        "esri/tasks/Locator",
        "esri/widgets/Legend",
        "esri/widgets/BasemapGallery",
        "esri/widgets/Locate",
        "esri/widgets/Home",
        "esri/widgets/Zoom",
        "esri/widgets/Popup",
        "esri/widgets/LayerList",
        "esri/widgets/Search",
        "esri/PopupTemplate"
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
        map: webmap,
        popup: {
          visible: false,
          dockEnabled: true,
          dockOptions: {
            // Disables the dock button from the popup
            buttonEnabled: false,
            // Ignore the default sizes that trigger responsive docking
            breakpoint: false,
            position: "bottom-right"
          }
        }
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

        esriMapView.on("click", evt => {
          this.mapStateService.changePanelState("none");
          // evt.stopPropagation();
          console.log("evt", evt);
          // this.mapViewEl.nativeElement.click()

          if (evt && evt.mapPoint) {
            // console.log("p-title", esriMapView.popup.get("title"));

            esriMapView.popup.watch("selectedFeature", evt_popup => {
              this.mapStateService.changePanelState("popup");
              this.mapStateService.update_popupData(evt_popup);
              if (evt_popup) {
                console.log("watch-epop", evt_popup);
                this.emitPopupData.emit(true);
              }
            });

            // console.log("popup-title", esriMapView.popup.title);
            // console.log("popup-content", esriMapView.popup.content);
            // console.log("popup-features", esriMapView.popup.features);
          }
        });

        // esriMapView.goTo
        // esriMapView.on('click', (evt) => {
        //   this.mapStateService.changePanelState("popup");
        //   evt.stopPropagation();

        //   console.log("evt-click", evt);

        //   // Make sure that there is a valid latitude/longitude
        //   // if (evt && evt.mapPoint) {
        //   //   // Create lat/lon vars to display in popup title
        //   //   var lat = Math.round(evt.mapPoint.latitude * 1000) / 1000;
        //   //   var lon = Math.round(evt.mapPoint.longitude * 1000) / 1000;

        //   //   esriMapView.popup.open({

        //   //     // var template = new EsriPopupTemplate({
        //   //     //   title:
        //   //     // })

        //   //     // Set the popup's title to the coordinates of the location
        //   //     title: 'Map view coordinates: [' + lon + ', ' + lat + ']',
        //   //     location: evt.mapPoint, // Set the location of the popup to the clicked location
        //   //     // content: setContentInfo(
        //   //     //   esriMapView.center,
        //   //     //   esriMapView.scale
        //   //     // ),
        //   //   });
        //   // } else {
        //   //   esriMapView.popup.open({
        //   //     // Set the popup's title to the coordinates of the location
        //   //     title: 'Invalid point location',
        //   //     location: evt.mapPoint, // Set the location of the popup to the clicked location
        //   //     content: 'Please click on a valid location.'
        //   //   });
        //   // }

        //   // function setContentInfo(center, scale) {
        //   //   var popupDiv = document.getElementById("popuppanel")

        //   // }
        // });
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
      });

      let popup = new EsriWidgetPopup({
        view: esriMapView,
        container: "popuppanel"
      });

      let layer = new EsriWidgetLayerList({
        view: esriMapView,
        container: "layer"
      });

      let search = new EsriWidgetSearch({
        view: esriMapView,
        container: "search",
        allPlaceholder: "Cari Lokasi, Bangunan, Kawasan, dll",
        sources: [
          {
            featureLayer: {
              url:
                "https://tataruang.jakarta.go.id/server/rest/services/DCKTRP/dkctrp_pendataan_bangunan/FeatureServer/0"
            },
            searchFields: [
              "LOKASI",
              "NAMA_BANGUNAN",
              "PENGELOLA_NAMA",
              "EMAIL",
              "KETERANGAN"
            ],
            displayField: "NAMA_BANGUNAN",
            exactMatch: false,
            outFields: ["*"],
            name: "Peta Bangunan",
            placeholder: "Cari peta bangunan",
            maxResults: 10,
            maxSuggestions: 6,
            suggestionsEnabled: true,
            minSuggestCharacters: 0,
            suggestionTemplate: "{NAMA_BANGUNAN} di {LOKASI}"
          },
          {
            featureLayer: {
              url:
                "https://tataruang.jakarta.go.id/server/rest/services/peta_dasar/batas_ops/MapServer/0"
            },
            searchFields: ["ID_SUBBLOCK_NEW"],
            displayField: "ID_SUBBLOCK_NEW",
            exactMatch: false,
            outFields: ["*"],
            name: "Batas Subblock Zonasi",
            placeholder: "Cari batas sublock zonasi",
            maxResults: 10,
            maxSuggestions: 6,
            suggestionsEnabled: true,
            minSuggestCharacters: 0,
          },
          {
            featureLayer: {
              url:
                "http://jakartasatu.jakarta.go.id/server/rest/services/DCKTRP/Peta_Struktur_2018/MapServer/12"
            },
            searchFields: ["NAMA_JALAN", "KETERANGAN"],
            displayField: "NAMA_JALAN",
            exactMatch: false,
            outFields: ["*"],
            name: "Jalan Jakarta",
            placeholder: "Cari jalan Jakarta",
            maxResults: 10,
            maxSuggestions: 6,
            suggestionsEnabled: true,
            minSuggestCharacters: 0,
            suggestionTemplate: "{NAMA_JALAN} ({KETERANGAN})"
          },
          {
            featureLayer: {
              url:
                "http://jakartasatu.jakarta.go.id/server/rest/services/DCKTRP/Peta_Struktur_2018/MapServer/3"
            },
            searchFields: ["NAMA_STASIUN"],
            displayField: "NAMA_STASIUN",
            exactMatch: false,
            outFields: ["*"],
            name: "Stasiun Kereta Api",
            placeholder: "Cari stasiun kereta api",
            maxResults: 10,
            maxSuggestions: 6,
            suggestionsEnabled: true,
            minSuggestCharacters: 0
          },
          {
            featureLayer: {
              url:
                "https://tataruang.jakarta.go.id/server/rest/services/dsda/DSDA_peta_Rawan_Banjir/FeatureServer/0"
            },
            searchFields: ["NAMA_LOKAS"],
            displayField: "NAMA_LOKAS",
            exactMatch: false,
            outFields: ["*"],
            name: "Kawasan Rawan Banjir",
            placeholder: "Cari kawasan rawan banjir",
            maxResults: 10,
            maxSuggestions: 6,
            suggestionsEnabled: true,
            minSuggestCharacters: 0
          },
          {
            featureLayer: {
              url:
                "https://tataruang.jakarta.go.id/server/rest/services/DCKTRP/UDGL/MapServer/0"
            },
            searchFields: ["NAMA_UDGL"],
            displayField: "NAMA_UDGL",
            exactMatch: false,
            outFields: ["*"],
            name: "Panduan Rancang Bangun Kota",
            placeholder: "Cari panduan rancang bangun kota",
            maxResults: 10,
            maxSuggestions: 6,
            suggestionsEnabled: true,
            minSuggestCharacters: 0
          },
          {
            featureLayer: {
              url:
                "http://jakartasatu.jakarta.go.id/server/rest/services/BPRD/q_bprd_master_pbb_pusat_edit/FeatureServer/0"
            },
            searchFields: ["D_NOP", "D_NOP_2"],
            displayField: "D_NOP",
            exactMatch: false,
            outFields: ["*"],
            name: "PBB - Nomor Objek Pajak",
            placeholder: "Cari nomor objek pajak (PBB)",
            maxResults: 10,
            maxSuggestions: 6,
            suggestionsEnabled: true,
            minSuggestCharacters: 0
          },
          {
            featureLayer: {
              url:
                "https://jakartasatu.jakarta.go.id/server/rest/services/DCKTRP/pasardanperbelanjaan/FeatureServer/0"
            },
            searchFields: ["NAME", "ADDRESS"],
            displayField: "NAME",
            exactMatch: false,
            outFields: ["*"],
            name: "Pusat Perbelanjaan",
            placeholder: "Cari pusat perbelanjaan",
            maxResults: 10,
            maxSuggestions: 6,
            suggestionsEnabled: true,
            minSuggestCharacters: 0,
            suggestionTemplate: "{NAME} di {ADDRESS}"
          },
          {
            featureLayer: {
              url:
                "http://jakartasatu.jakarta.go.id/server/rest/services/DCKTRP/cagarbudaya/MapServer/0"
            },
            searchFields: [
              "NAME",
              "ALAMAT___L",
              "JENIS_CAGA",
              "SK_KETETAP",
              "KETERANGAN"
            ],
            displayField: "NAME",
            exactMatch: false,
            outFields: ["*"],
            name: "Cagar Budaya",
            placeholder: "Cari cagar budaya",
            maxResults: 10,
            maxSuggestions: 6,
            suggestionsEnabled: true,
            minSuggestCharacters: 0,
            suggestionTemplate: "{NAME}, jenis: {JENIS_CAGA}"

          },
          {
            featureLayer: {
              url:
                "https://jakartasatu.jakarta.go.id/server/rest/services/DCKTRP/pasardanperbelanjaan/FeatureServer/1"
            },
            searchFields: [
              "NAMA_PASAR",
              "ALAMAT",
              "KLASIFIKASI",
              "KOTA",
              "KEPALA_PASAR",
              "NO_TELP",
              "JENIS_JUALAN",
              "TELEPON_KANTOR"
            ],
            displayField: "NAMA_PASAR",
            exactMatch: false,
            outFields: ["*"],
            name: "Pasar Tradisional (PD Pasar Jaya)",
            placeholder: "Cari pasar tradisional",
            maxResults: 10,
            maxSuggestions: 6,
            suggestionsEnabled: true,
            minSuggestCharacters: 0,
            suggestionTemplate: "{NAMA_PASAR}, klasifikasi: {KLASIFIKASI}"
          },
          {
            featureLayer: {
              url:
                "http://jakartasatu.jakarta.go.id/server/rest/services/JakartaSatu/model_gab_rth/FeatureServer/0"
            },
            searchFields: [
              "NAMA",
              "KETERANGAN",
              "JENIS_OBJECT",
              "PEMBANGUNAN_RTH",
              "NO_SERTIFIKAT",
              "KATEGORI_ASET",
              "PENGELOLA",
              "KET_KONDISI_EXISTING",
              "ALAMAT",
              "FUNGSI_LAHAN",
              "KIB_KODE_BARANG",
              "KIB_NO_REGISTER"
            ],
            displayField: "NAMA",
            exactMatch: false,
            outFields: ["*"],
            name: "Ruang Terbuka Hijau Aset Pemda DKI Jakarta",
            placeholder: "cari RTH pemda Jakarta",
            maxResults: 10,
            maxSuggestions: 6,
            suggestionsEnabled: true,
            minSuggestCharacters: 0
          },
          {
            featureLayer: {
              url:
                "http://jakartasatu.jakarta.go.id/server/rest/services/DCKTRP/TM_Aset_BGP/FeatureServer/0"
            },
            searchFields: [
              "PEMANFAATAN",
              "KETPEMANFAATAN",
              "MASSABANGUNAN",
              "NAMA_BANGUNAN",
              "PEMEGANG_KIBC",
              "PEMANFAATAN_GEDUNG",
              "ALAMAT"
            ],
            displayField: "MASSABANGUNAN",
            exactMatch: false,
            outFields: ["*"],
            name: "Bangunan Aset Pemda DKI Jakarta",
            placeholder: "Cari bangunan aset pemda Jakarta",
            maxResults: 10,
            maxSuggestions: 6,
            suggestionsEnabled: true,
            minSuggestCharacters: 0
          },
          {
            featureLayer: {
              url:
                "http://jakartasatu.jakarta.go.id/server/rest/services/DCKTRP/TM_Aset_BGP/FeatureServer/1"
            },
            searchFields: [
              "NAMA_BANGUNAN",
              "PEMEGANG_KIBC",
              "PEMANFAATAN_GEDUNG",
              "ALAMAT",
              "KETERANGAN"
            ],
            displayField: "Nama Bangunan / Nama Kawasan",
            exactMatch: false,
            outFields: ["*"],
            name: "Lahan Aset Pemda DKI Jakarta",
            placeholder: "cari lahan aset pemda Jakarta",
            maxResults: 10,
            maxSuggestions: 6,
            suggestionsEnabled: true,
            minSuggestCharacters: 0
          }
          // {
          //   locator: new EsriTaskLocator({ url: "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer" }),
          //   singleLineFieldName: "SingleLine",
          //   name: "ArcGIS World Geocoding Service",
          //   localSearchOptions: {
          //     minScale: 300000,
          //     distance: 50000
          //   },
          //   countryCode: "ID",
          //   placeholder: "Find address or place",
          //   maxResults: 3,
          //   maxSuggestions: 6,
          //   suggestionsEnabled: false,
          //   minSuggestCharacters: 0
          // }
        ]
      });

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

      // esriMapView.on("click", evt => {
      //   // console.log(
      //   //   esriMapView.popup.title,
      //   //   esriMapView.popup.selectedFeature,
      //   //   esriMapView.popup
      //   // );

      // });
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
