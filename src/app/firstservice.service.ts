import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
 import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';

@Injectable()
export class FirstserviceService {

  constructor(private http:Http) { }
  showTodayDate(){
  	let ndate = new Date();
  	return ndate;
  }

  getData(){
  	// return this.http.get('http://jsonplaceholder.typicode.com/users').
  	return this.http.get('http://localhost:5000').
  	map((response) => response.json())
  }


  public getDoc<T>(id:data):Observable<T>{
    return this.http.post<T>('http://localhost:5000/getdoc'{"id":id.id})
  }

}
