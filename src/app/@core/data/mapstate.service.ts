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

	// changePopupData(data: any) {
	// 	this.exexChange_popupData.next(data);
	// }

	listen_popupData(): Observable<any> {
		return this.exexChange_popupData.asObservable();
	}

	update_popupData(data: any) {
		this.exexChange_popupData.next(data);
	}

	listen_esriMapView(): Observable<any> {
		return this.listeners_esriMapView.asObservable();
	}

	stateEsriMapView(mapView: any) {
		this.listeners_esriMapView.next(mapView);
	}

	listeners_attachment: Subject<any> = new Subject<any>();

	listen_attachment(): Observable<any> {
		return this.listeners_attachment.asObservable();
	}

	store_attachment(attachment: any) {
		this.listeners_attachment.next(attachment);
	}

	listeners_attachmentWindow: Subject<any> = new Subject<any>();

	listen_attachmentWindow(): Observable<any> {
		return this.listeners_attachmentWindow.asObservable();
	}

	store_attachmentWindow(attachmentWindow: any) {
		this.listeners_attachmentWindow.next(attachmentWindow);
	}

	listeners_popupTabs: Subject<any> = new Subject<any>();

	listen_popupTabs(): Observable<any> {
		return this.listeners_popupTabs.asObservable();
	}

	store_popupTabs(popupTabs: any) {
		this.listeners_popupTabs.next(popupTabs);
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
