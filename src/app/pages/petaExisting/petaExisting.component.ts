import { Component, OnInit } from '@angular/core';
import { MapStateService } from '../../@core/data/mapstate.service';

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

	constructor(private mapStateService: MapStateService) {
		this.mapStateService.changeFooterTitle('PETA EXISTING RUANG JAKARTA')
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
		// this._subcriptionMapCenter = this.mapStateService.execChange_locationpoint.subscribe((value) => {
		// 	this.mapCenter = value;
		// });
	}

	// See app.component.html
	mapLoadedEvent(status: boolean) {
		console.log('The map loaded: ' + status);
	}
}
