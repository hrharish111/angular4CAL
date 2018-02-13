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
  public get_index(){
  	return this.http.get('http://localhost:5000/get_index').
  	map(response => response.json())
  }

  public getDoc(id){
    console.log(id);
    return this.http.post('http://localhost:5000/getdoc',{'id': id._id})
    .map(response => response.json());
  }

  public add_training_service(index_details, selected_doc){
    console.log(index_details, selected_doc);
    return this.http.post('http://localhost:5000/add_training_service',{'index_details': index_details, 'selected_doc': selected_doc})
    .map(response => response.json());
  }



  public get_index_service() {
    return this.http.get('http://localhost:5000/getdoc')
    .map(response => response.json());
  }

  public get_cal_index_service(cal_id) {
    return this.http.post('http://localhost:5000/get_cal_server',{'cal_id': cal_id})
    .map(response => response.json());
  }

  public create_cal_instance(args) {
    console.log(args);
    return this.http.post('http://localhost:5000/create_cal_instance',{'cal_inputs': args})
      .map(response => response.json());
  }

  public get_serarched_data(args) {
    return this.http.post('http://localhost:5000/get_search_word',{'search_text': args})
      .map(response => response.json());
  }

}
