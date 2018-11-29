import { Component, OnInit } from '@angular/core';
import { MapStateService } from '../../@core/data/mapstate.service';

@Component({
	selector: 'app-peta-three-d',
	templateUrl: './petaThreeD.component.html'
})
export class PetaThreeDComponent implements OnInit {
	_subcriptionMapCenter: any;
	mapCenter = [ -6.175, 106.825 ];
	basemapType = 'satellite';
	mapZoomLevel = 15;
	websceneId = '7864459094ca4681ad772b8f33922d43';
	maptype = 'scene'
	// coordinate = [null, null];

	constructor(private mapStateService: MapStateService) {
		this.mapStateService.changeFooterTitle('PETA 3D JAKARTA (BETA)');
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
	}



	// See app.component.html
	mapLoadedEvent(status: boolean) {
		console.log('The map loaded: ' + status);
	}
}
