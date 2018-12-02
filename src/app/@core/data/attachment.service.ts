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
export class AttachmentService {

	constructor(private http: HttpClient, private mapStateService: MapStateService) {}

	private extractData(res: Response) {
		let body = res;
		return body || {};
    }
    
    getAttachments(endpoint: string): Observable<any> {
        return this.http.get(endpoint, httpOptions).pipe(map(this.extractData));
    }

}
