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

import { MapStateService } from '../@core/data/mapstate.service';

import esri = __esri;

@Component({
	selector: 'map-arcgis',
	templateUrl: './map-arcgis.component.html',
	styleUrls: [ './map-arcgis.component.css' ]
})
export class MapArcgisComponent implements OnInit {
	@Output() mapLoaded = new EventEmitter<boolean>();
	@ViewChild('mapViewNode') private mapViewEl: ElementRef;

	@Output() emitEsriMapView = new EventEmitter();
	@Output() emitPopupData = new EventEmitter<boolean>();

	/**
   * @private _zoom sets map zoom
   * @private _center sets map center
   * @private _basemap sets type of map
   */
	private _zoom: number = 15;
	private _center: Array<number> = [ -6.175642711255031, 106.8251880714399 ];
	private _basemap: string = 'streets';
	private _webmap: string = 'a762c0e234a94af99cf8c2a0c835f7d4';
	private _coordinate: Array<number> = [ null, null ];
	// esriMapView: any;

	_subcriptionMapCenter: any;
	_subscriptionMapPopup: any;

	_isMapScaled: any = null;

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
			const dojo_options = {
				// tell Dojo where to load other packages
				dojoConfig: {
					has: {
						'esri-featurelayer-webgl': 1
					}
				}
			};
			const [
				EsriMapView,
				EsriWebMap,
				EsriConfig,
				EsriWebMercator,
				// EsriFeatureLayer,
				// EsriTaskLocator,
				EsriWidgetLocate,
				EsriWidgetHome,
				EsriWidgetZoom,
				EsriWidgetPopup
			] = await loadModules(
				[
					'esri/views/MapView',
					'esri/WebMap',
					'esri/config',
					'esri/geometry/support/webMercatorUtils',
					// "esri/layers/FeatureLayer",
					// "esri/tasks/Locator",
					'esri/widgets/Locate',
					'esri/widgets/Home',
					'esri/widgets/Zoom',
					'esri/widgets/Popup'
				],
				dojo_options
			);

			// set portalUrl
			const esriConfig: esri.config = EsriConfig;
			esriConfig.portalUrl = 'http://jakartasatu.jakarta.go.id/portal';

			// webmap properties
			const webmapProperties: esri.WebMapProperties = {
				portalItem: {
					id: this._webmap
				}
			};

			const webmap: esri.WebMap = new EsriWebMap(webmapProperties);

			// Set type of map view
			// const mapProperties: esri.MapProperties = {
			//   basemap: this._basemap
			// };

			// Map Constructor =/= WebMap
			// const map: esri.Map = new EsriMap(mapProperties);

			// Set type of map view
			// ** note: if map type is webmap, center and zoom properties will cause an error, instead use
			const mapViewProperties: esri.MapViewProperties = {
				container: this.mapViewEl.nativeElement,
				// center: this._coordinate,
				// zoom: this._zoom,
				map: webmap,
				constraints: {
					snapToZoom: false
				},
				highlightOptions: {
					color: [ 255, 165, 2, 1 ],
					haloOpacity: 0.9,
					fillOpacity: 0.2
				},
				popup: {
					// autoCloseEnabled: true,
					collapsed: true,
					visible: false,
					dockEnabled: true
					// dockOptions: {
					//   // Disables the dock button from the popup
					//   buttonEnabled: false,
					//   // Ignore the default sizes that trigger responsive docking
					//   breakpoint: false,
					//   position: "bottom-right"
					// }
				}
			};

			const esriMapView: esri.MapView = new EsriMapView(mapViewProperties);

			// All resources in the MapView and the map have loaded.
			// Now execute additional processes

			// MapView Component
			esriMapView.when(() => {
				esriMapView.goTo({
					zoom: 15
				});
				// console.log("webmap status : ", webmap.loadStatus);

				this.mapLoaded.emit(true);
				// this.emitEsriMapView.emit(esriMapView);
				this.mapStateService.stateEsriMapView(esriMapView);

				// let _attachments: Array<any>;

				esriMapView.on('click', (evt) => {
					let { x, y } = EsriWebMercator.webMercatorToGeographic(
						esriMapView.toMap({ x: evt.x, y: evt.y })
					);
					this._coordinate = [ y, x ];
          this.mapStateService.updateLocationPoint(this._coordinate);
          this.mapStateService.store_coordinates(this._coordinate)
					console.log('click-coordinate', this._coordinate);
					// esriMapView.goTo({
					//   zoom: 15
					// });
					let long_drag_revert = 0.003;
					let evtExtent = [ evt.mapPoint.longitude - long_drag_revert, evt.mapPoint.latitude ];
					// esriMapView.goTo({
					// 	target: evtExtent,
					// 	scale: 24000
					// });
					this.mapStateService.changePanelState('none');
					this.mapStateService.store_attachmentWindow('closed');
					// evt.stopPropagation();
					console.log('evt', evt);
					// this.mapViewEl.nativeElement.click()

					let _popupData;

					if (evt && evt.mapPoint) {
						// console.log("p-title", esriMapView.popup.get("title"));

						// Popup Listener - All Features
						esriMapView.popup.watch('features', (features) => {
							// console.log("watch-e-pop-features", features);
							if (features) {
								console.log('watch-e-pop-features', features);
								this.emitPopupData.emit(true);

								this.mapStateService.changePanelState('popup');
								this.mapStateService.update_popupData(features);

								// features.forEach((feature) => {
								//   if ( feature.attributes.OBJECTID !== undefined ) {
								//     _attachments.push(feature.layer.url + '/0/' + feature.attributes.OBJECTID);
								//   }
								// });

								// console.log("attachment: ", _attachments);

								// this.mapStateService.store_attachment(_attachments)
							}
						});

						esriMapView.popup.watch('selectedFeature', (selectedFeature) => {
							if (selectedFeature) {
								esriMapView.goTo({
									target: [
										selectedFeature.geometry.extent.center.longitude,
										selectedFeature.geometry.extent.center.latitude
									],
									zoom: 18
								});
								// console.log('selectedFeature', selectedFeature);
								// this.mapStateService.store_coordinates([
								// 	selectedFeature.geometry.centroid.latitude,
								// 	selectedFeature.geometry.centroid.longitude
								// ]);
							}

							// this.mapStateService.store_mapScale(18);
							// console.log('esriMapView.viewpoint', esriMapView.viewpoint);

							// this.mapStateService.listen_mapScale().subscribe((mapScale: any) => {
							// 	if (mapScale == 18) {
							// 		esriMapView.goTo({
							// 			target: [
							// 				esriMapView.viewpoint.targetGeometry["longitude"]+0.003,
							// 				esriMapView.viewpoint.targetGeometry["latitude"]
							// 			],
							// 			zoom: 18
							// 		});
							// 	}
							// });

							// this.mapStateService.store_mapScale(0);
						});

						// esriMapView.popup.watch('selectedFeature', (selectedFeature) => {
						// 	this.mapStateService.listen_mapScale().subscribe((isMapScaled: any) => {
						//     console.log("isMapScaled", isMapScaled);

						// 		this._isMapScaled = isMapScaled;
						// 	});

						// 	if (this._isMapScaled == null) {
						// 		console.log('selectedFeature', selectedFeature);
						// 		let long_drag = 0.003;
						// 		let geoExtent = selectedFeature.geometry.extent;
						// 		console.log('geoExt', geoExtent.center.longitude);
						// 		geoExtent.center.longitude = geoExtent.center.longitude + long_drag;
						// 		console.log('geoExtent', geoExtent.center.longitude);

						// 		esriMapView.goTo({
						// 			target: selectedFeature.geometry.extent,
						// 			// center: [],
						// 			scale: 5000
						// 		});
						// 		esriMapView.goTo({
						// 			target: [ geoExtent.center.longitude, geoExtent.center.latitude ],
						// 			// center: [],
						// 			scale: 5000
						// 		});
						// 	}

						// 	if (this._isMapScaled == 1) {
						// 		console.log('selectedFeature', selectedFeature);
						// 		let long_drag = 0.003;
						// 		let geoExtent = selectedFeature.geometry.extent;
						// 		console.log('geoExt', geoExtent.center.longitude);
						// 		geoExtent.center.longitude = geoExtent.center.longitude + long_drag;
						//     console.log('geoExtent', geoExtent.center.longitude);

						//     // esriMapView.goTo({
						// 		// 	target: selectedFeature.geometry.extent,
						// 		// 	// center: [],
						// 		// 	scale: 5000
						// 		// });
						// 		// esriMapView.goTo({
						// 		// 	target: [ geoExtent.center.longitude, geoExtent.center.latitude ],
						// 		// 	// center: [],
						// 		// 	scale: 5000
						//     // });
						//     esriMapView.goTo({
						// 			target: [ selectedFeature.geometry.extent.center.longitude-long_drag, selectedFeature.geometry.extent.center.latitude ],
						// 			// center: [],
						// 			// scale: 5000
						//     });
						//     // this.mapStateService.store_mapScale(0);
						//     // esriMapView.goTo({
						//     //   scale: 5000,
						//     // })
						// 		// esriMapView.goTo({
						// 		// 	target: [selectedFeature.geometry.extent.center.longitude+long_drag, selectedFeature.geometry.extent.center.latitude],
						// 		// 	// center: [],
						// 		// 	// scale: 5000
						//     // });
						// 	}

						// 	// console.log('selectedFeature', selectedFeature);
						// 	// let long_drag = 0.003;
						// 	// let geoExtent = selectedFeature.geometry.extent;
						// 	// console.log('geoExt', geoExtent.center.longitude);
						// 	// geoExtent.center.longitude = geoExtent.center.longitude + long_drag;
						// 	// console.log('geoExtent', geoExtent.center.longitude);

						// 	// esriMapView.goTo({
						// 	// 	target: selectedFeature.geometry.extent,
						// 	// 	// center: [],
						// 	// 	scale: 5000
						// 	// });
						// 	// esriMapView.goTo({
						// 	// 	target: [ geoExtent.center.longitude, geoExtent.center.latitude ],
						// 	// 	// center: [],
						// 	// 	scale: 5000
						// 	// });
						// });

						// this.mapStateService.store_mapScale(1);

						// // Popup Listener - Selected Feature
						// esriMapView.popup.watch("selectedFeature", evt_popup => {
						//   this.mapStateService.changePanelState("popup");
						//   this.mapStateService.update_popupData(evt_popup);
						//   if (evt_popup) {
						//     console.log("watch-epop", evt_popup);
						//     this.emitPopupData.emit(true);
						//   }
						// });
					}
				});
			});

			let locate = new EsriWidgetLocate({
				view: esriMapView,
				container: 'locate'
			});

			let home = new EsriWidgetHome({
				view: esriMapView,
				container: 'home'
			});

			let zoom = new EsriWidgetZoom({
				view: esriMapView,
				container: 'zoom'
			});

			let popup = new EsriWidgetPopup({
				view: esriMapView,
				container: 'popuppanel',
				visible: false
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
			console.log('We have an error: ' + error);
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
