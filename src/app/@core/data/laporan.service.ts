import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';

import { MapStateService } from './mapstate.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable()
export class LaporanService {

    data = {
        date: null,
        geometry: {
            latitude: null,
            longitude: null,
        },
        message: "null"
    }


	constructor(private http: HttpClient, private mapStateService: MapStateService) {}

	private extractData(res: Response) {
		let body = res;
		return body || {};
    }
    
    getAttachments(endpoint: string): Observable<any> {
        return this.http.get(endpoint, httpOptions).pipe(map(this.extractData));
    }

    submitLaporan(data: Object): Observable<any> {
        return
    }

    listeners_laporanState: Subject<any> = new Subject<any>();

	listen_laporanState(): Observable<any> {
		return this.listeners_laporanState.asObservable();
	}

	store_laporanState(laporanState: any) {
		this.listeners_laporanState.next(laporanState);
	}

}
