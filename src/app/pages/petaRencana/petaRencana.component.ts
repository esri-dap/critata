import { Component, OnInit } from '@angular/core';
import { MapStateService } from '../../@core/data/mapstate.service';

@Component({
	selector: 'app-peta-rencana',
	templateUrl: './petaRencana.component.html'
})
export class PetaRencanaComponent implements OnInit {
	_subcriptionMapCenter: any;
	mapCenter = [ -6.175, 106.825 ];
	basemapType = 'streets';
	mapZoomLevel = 15;
	webmapId = 'f0ef41610e534a939ff934a80527ec75';
	// coordinate = [null, null];

	constructor(private mapStateService: MapStateService) {
		this.mapStateService.changeFooterTitle('PETA RENCANA RUANG JAKARTA');
		// this._subcriptionMapCenter = this.mapStateService.execChange_locationpoint.subscribe((value) => {
		// 	console.log("state-coord", value);
		// 	this.coordinate = value; // this.username will hold your value and modify it every time it changes
		// });
	}

	ngOnInit() {
		// this._subcriptionMapCenter = this.mapStateService.execChange_locationpoint.subscribe((value) => {
		// 	console.log("state-coord", value);
		// 	this.coordinate = value; // this.username will hold your value and modify it every time it changes
		// });
		// this.mapArcgis.esriMapView.
	}

	// See app.component.html
	mapLoadedEvent(status: boolean) {
		console.log('The map loaded: ' + status);
	}
}
