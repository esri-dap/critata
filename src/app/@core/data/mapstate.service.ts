import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MapStateService {
	execChange_footertitle: Subject<any> = new Subject<any>();
	execChange_locationpoint: Subject<any> = new Subject<any>();
	execChange_panelState: Subject<any> = new Subject<any>();

	coordinates: Array<number> = [null, null];
	panelOpened: string;

	constructor() {}

	/**
     * Use to change user name 
     * @data type: string
     */
	changeFooterTitle(data: string) {
		this.execChange_footertitle.next(data);
	}

	updateLocationPoint(data: number[]) {
		this.execChange_locationpoint.next(data);
		this.coordinates = data;
		console.log("global-coord", this.coordinates);
		
	}

	changePanelState(data: string) {
		this.execChange_panelState.next(data);
		this.panelOpened = data;
	}
}
