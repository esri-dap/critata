import { Component, OnInit } from '@angular/core';
import { MapStateService } from '../../@core/data/mapstate.service';

@Component({
	selector: 'app-peta-rencana',
	templateUrl: './petaRencana.component.html'
})
export class PetaRencanaComponent implements OnInit {
	mapCenter = [ -6.175, 106.825 ];
	basemapType = 'streets';
	mapZoomLevel = 12;
	webmapId = 'f0ef41610e534a939ff934a80527ec75';

	constructor(private mapStateService: MapStateService) {
		this.mapStateService.changeFooterTitle('PETA RENCANA RUANG JAKARTA');
	}

	ngOnInit() {

	}

	// See app.component.html
	mapLoadedEvent(status: boolean) {
		console.log('The map loaded: ' + status);
	}
}
