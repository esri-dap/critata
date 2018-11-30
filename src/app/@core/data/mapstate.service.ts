import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MapStateService {
	execChange_footertitle: Subject<any> = new Subject<any>();
	execChange_locationpoint: Subject<any> = new Subject<any>();
	execChange_panelState: Subject<any> = new Subject<any>();

	execChange_popupState: Subject<any> = new Subject<any>();
	exexChange_popupData: Subject<any> = new Subject<any>();

	coordinates: Array<number> = [null, null];
	panelOpened: string;

	listeners_esriMapView: Subject<any> = new Subject<any>();

	changePopupData(data: any) {
		this.exexChange_popupData.next(data);
	}

	listen_esriMapView(): Observable<any> {
		return this.listeners_esriMapView.asObservable();
	}

	stateEsriMapView(mapView: any) {
		this.listeners_esriMapView.next(mapView);
	}

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

	changePopupState(data: any) {
		this.execChange_popupState.next(data);
	}
}
