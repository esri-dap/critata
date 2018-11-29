import { Component, OnInit } from '@angular/core';
import { MapStateService } from '../../@core/data/mapstate.service';
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

	  panelState: string;

	constructor(private mapStateService: MapStateService) {
		this.mapStateService.changeFooterTitle('PETA RUANG JAKARTA')
		// this._subcriptionMapCenter = this.mapStateService.execChange_locationpoint.subscribe((value) => {
		// 	console.log("state-coord", value);
		// 	this.coordinate = value; // this.username will hold your value and modify it every time it changes
		// });
		this._subscriptionPanelState = this.mapStateService.execChange_panelState.subscribe((value) => {
			this.panelState = value;
			if (value == "basemap") {
				this.panelbasemap = !this.panelbasemap;
				this.panellaporan = false;
				this.panellegend = false;
				this.panelmeasure = false;
				this.panelsearch = false;
				this.panelshare = false;
			}
			if (value == "laporan") {
				this.panelbasemap = false;
				this.panellaporan = !this.panellaporan;
				this.panellegend = false;
				this.panelmeasure = false;
				this.panelsearch = false;
				this.panelshare = false;
			}
			if (value == "legend") {
				this.panelbasemap = false;
				this.panellaporan = false;
				this.panellegend = !this.panellegend;
				this.panelmeasure = false;
				this.panelsearch = false;
				this.panelshare = false;
			}
			if (value == "measure") {
				this.panelbasemap = false;
				this.panellaporan = false;
				this.panellegend = false;
				this.panelmeasure = !this.panelmeasure;
				this.panelsearch = false;
				this.panelshare = false;
			}
			if (value == "search") {
				this.panelbasemap = false;
				this.panellaporan = false;
				this.panellegend = false;
				this.panelmeasure = false
				this.panelsearch = !this.panelsearch;
				this.panelshare = false;
			}
			if (value == "share") {
				this.panelshare = !this.panelshare;
				this.panellaporan = false;
				this.panellegend = false;
				this.panelmeasure = false;
				this.panelsearch = false;
				this.panelbasemap = false;
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

	// See app.component.html
	mapLoadedEvent(status: boolean) {
		console.log('The map loaded: ' + status);
	}

	togglePanel(panel: string) {
		this.mapStateService.changePanelState(panel);
	  }

	// togglePanel() {
	// 	this.opened = !this.opened;
	//   }
}
