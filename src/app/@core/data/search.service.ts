import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*'
	})
};

@Injectable()
export class SearchService {

    _searchResult: any;

	constructor(private http: HttpClient) {}

	private extractData(res: Response) {
		let body = res;
		return body || {};
	}

    // searchItemz(endpoint: string, input: string): Observable<any> {
    //     return this.http.post<any>(
    //         endpoint, {
    //             f: 'json',
    //             where: input,
    //             outSr: '4326',
	// 			outFields: '*',
	// 			returnCountOnly: false,
	// 			returnGeometry: true,
    //         },
    //         { headers: { 'Content-Type': 'application/x-www-form-urlencoded'} }
    //     ).pipe(map(this.extractData))
	// }
	
	searchItem(source: any): Observable<any> {
		let __params = new HttpParams()
						.set('f', 'json')
						.set('where', '1=1')
						.set('outFields', '*')
						.set('outSr', '4326')
						.set('returnCountOnly', 'false')
						.set('returnGeometry', 'true');

		return this.http.get(source, {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			}),
			params: __params,
		}
		).pipe(map(this.extractData));
	}

      private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
      
          // TODO: send the error to remote logging infrastructure
          console.error(error); // log to console instead
      
          // TODO: better job of transforming error for user consumption
          console.log(`${operation} failed: ${error.message}`);
      
          // Let the app keep running by returning an empty result.
          return of(result as T);
        };
      }
}
