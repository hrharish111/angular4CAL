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
  	return this.http.get('http://localhost:5000').
  	map(response => response.json())
  }

  // public getData<T>():Observable<T>{
  //   return this.http.post<T>('http://localhost:5000')
  // }


  public getDoc(id){
    return this.http.post('http://localhost:5000/getdoc',{"id":id.id})
    .map(response => response.json())
  }

}
