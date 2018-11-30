import { Component, OnInit } from '@angular/core';
import { MapStateService } from '../../@core/data/mapstate.service';
import { MapArcgisModule } from '../../map-arcgis/map-arcgis.module';
// import { MapLegendComponent } from '../../map-arcgis/legend/legend.component'

@Component({
	selector: 'app-peta-existing',
	styleUrls: [ './petaExisting.component.scss' ],
	templateUrl: './petaExisting.component.html'
})
export class PetaExistingComponent implements OnInit {
	_subcriptionMapCenter: any;
	mapCenter = [ -6.175, 106.825 ];
	basemapType = 'satellite';
	mapZoomLevel = 15;
	webmapId = 'a762c0e234a94af99cf8c2a0c835f7d4';
	// coordinate = [null, null];

	_subscriptionPanelState: any;
	panelbasemap: Boolean = false;
	panellaporan: Boolean = false;
	panellegend: Boolean = false;
	panelmeasure: Boolean = false;
	panelsearch: Boolean = false;
	panelshare: Boolean = false;
	panelpopup: Boolean = false;
	panellayercontrol: Boolean = false;

	panelState: string;

	constructor(private mapStateService: MapStateService) {
		this.mapStateService.changeFooterTitle('PETA RUANG JAKARTA');
		// this._subcriptionMapCenter = this.mapStateService.execChange_locationpoint.subscribe((value) => {
		// 	console.log("state-coord", value);
		// 	this.coordinate = value; // this.username will hold your value and modify it every time it changes
		// });
		this._subscriptionPanelState = this.mapStateService.execChange_panelState.subscribe((value) => {
			this.panelState = value;
			if (value == 'none') {
				this.panelshare = false
				this.panellaporan = false;
				this.panellegend = false;
				this.panelmeasure = false;
				this.panelsearch = false;
				this.panelbasemap = false;
				this.panellayercontrol = false;
				this.panelpopup = false;
			}
			if (value == 'basemap') {
				this.panelbasemap = !this.panelbasemap;
				this.panellaporan = false;
				this.panellegend = false;
				this.panelmeasure = false;
				this.panelsearch = false;
				this.panelshare = false;
				this.panellayercontrol = false
				this.panelpopup = false;
			}
			if (value == 'laporan') {
				this.panelbasemap = false;
				this.panellaporan = !this.panellaporan;
				this.panellegend = false;
				this.panelmeasure = false;
				this.panelsearch = false;
				this.panelshare = false;
				this.panellayercontrol = false
				this.panelpopup = false;
			}
			if (value == 'legend') {
				this.panelbasemap = false;
				this.panellaporan = false;
				this.panellegend = !this.panellegend;
				this.panelmeasure = false;
				this.panelsearch = false;
				this.panelshare = false;
				this.panellayercontrol = false
				this.panelpopup = false;
			}
			if (value == 'measure') {
				this.panelbasemap = false;
				this.panellaporan = false;
				this.panellegend = false;
				this.panelmeasure = !this.panelmeasure;
				this.panelsearch = false;
				this.panelshare = false;
				this.panellayercontrol = false
				this.panelpopup = false;
			}
			if (value == 'search') {
				this.panelbasemap = false;
				this.panellaporan = false;
				this.panellegend = false;
				this.panelmeasure = false;
				this.panelsearch = !this.panelsearch;
				this.panelshare = false;
				this.panellayercontrol = false
				this.panelpopup = false;
			}
			if (value == 'share') {
				this.panelshare = !this.panelshare;
				this.panellaporan = false;
				this.panellegend = false;
				this.panelmeasure = false;
				this.panelsearch = false;
				this.panelbasemap = false;
				this.panelpopup = false;
				this.panellayercontrol = false
				this.panelpopup = false;
			}
			if (value == 'layercontrol') {
				this.panelshare = false
				this.panellaporan = false;
				this.panellegend = false;
				this.panelmeasure = false;
				this.panelsearch = false;
				this.panelbasemap = false;
				this.panellayercontrol = !this.panellayercontrol
				this.panelpopup = false;
			}
			if (value == 'popup') {
				this.panelbasemap = false;
				this.panellaporan = false;
				this.panellegend = false;
				this.panelmeasure = false;
				this.panelsearch = false;
				this.panelshare = false;
				this.panelpopup = true;
				// this.mapStateService.listen_esriMapView().subscribe((mapView: any) => {
				// 	this.panelpopup = !this.panelpopup;
					
				// });
			}
		});
	}

	ngOnInit() {
		// this._subcriptionMapCenter = this.mapStateService.execChange_locationpoint.subscribe((value) => {
		// 	console.log("state-coord", value);
		// 	this.coordinate = value; // this.username will hold your value and modify it every time it changes
		// });
		// this._subcriptionMapCenter = this.mapStateService.execChange_locationpoint.subscribe((value) => {
		// 	this.mapCenter = value;
		// });
	}

	togglePanel(panel: string) {
		this.mapStateService.changePanelState(panel);
	}

	// async initPopup() {
	// 	try {
	// 		const [ EsriWidgetLegend, EsriWidgetBasemap ] = await loadModules([
	// 			'esri/widgets/Legend',
	// 			'esri/widgets/BasemapGallery'
	// 		]);
	// 		this.mapStateService.listen_esriMapView().subscribe((mapView: any) => {
	// 			var legend = new EsriWidgetLegend({
	// 				view: mapView,
	// 				container: 'legend'
	// 			});
	// 			var basemap = new EsriWidgetBasemap({
	// 				view: mapView,
	// 				container: 'basemap'
	// 			});
	// 		});
	// 	} catch (error) {
	// 		console.log('failed on loadBasemapAndLegend: ' + error);
	// 	}
	// }

	showPopup() {}
}
