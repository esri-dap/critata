import { Component, OnInit } from '@angular/core';
import { MapStateService } from '../../@core/data/mapstate.service';

@Component({
	selector: 'app-peta-three-d',
	templateUrl: './petaThreeD.component.html'
})
export class PetaThreeDComponent implements OnInit {
	mapCenter = [ -6.175, 106.825 ];
	basemapType = 'satellite';
	mapZoomLevel = 12;
	webmapId = 'a762c0e234a94af99cf8c2a0c835f7d4';

	constructor(private mapStateService: MapStateService) {
		this.mapStateService.changeFooterTitle('PETA 3D JAKARTA (BETA)');
	}

	ngOnInit() {

	}

	// See app.component.html
	mapLoadedEvent(status: boolean) {
		console.log('The map loaded: ' + status);
	}
}
