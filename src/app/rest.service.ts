import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class RestService {

  private version = "";
	private apiUrl = 'https://www.admin.parexkonso.com/api/';
	//private apiUrl = 'http://www.parex-bo.test/api/';

	constructor(public http: HttpClient) {
		console.log('Hello RestProvider Provider');
	}

	getLocalData(): Observable<Object> {
		return this.http.get("../assets/json/data.json");
	}

	getRemoteData(): Observable<Object> {
    console.log('RestService --> getRemoteData');
		return this.http.get(this.apiUrl + "get-datas/?version=" + this.version, {
			'headers':new HttpHeaders({ 
			  "Access-Control-Allow-Origin": '*',
			  "Access-Control-Allow-Methods":'GET, PUT, POST, DELETE, OPTIONS',
			  "Access-Control-Allow-Headers": 'Content-Type',
			})
		  })
	}

	getRemoteVersion(): Observable<Object> {
    console.log('RestService --> getRemoteVersion');
    return this.http.get(this.apiUrl + "get-appversion/", {
      'headers':new HttpHeaders({ 
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods":'GET, PUT, POST, DELETE, OPTIONS',
        "Access-Control-Allow-Headers": 'Content-Type',
      })
    })
	}

	extractData(res: Response) {
		let body = res.json();
		return body || {};
	}

	handleError(error: Response | any) {
		let errMsg: string;
		if (error instanceof Response) {
			const body = error.json() || '';
			const err = /*body.error || */JSON.stringify(body);
			errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
		} else {
			errMsg = error.message ? error.message : error.toString();
		}
		//return Observable.throw new Error("");
	}

	setVersion(v: any) {
		this.version = v;
	}
}
