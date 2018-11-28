import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MapStateService {
	execChange_footertitle: Subject<any> = new Subject<any>();
	execChange_locationpoint: Subject<any> = new Subject<any>();

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
	}
}
