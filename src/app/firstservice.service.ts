import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
 import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../environments/environment';

@Injectable()
export class FirstserviceService {


  constructor(private http: Http) { }
  showTodayDate(){
  	let ndate = new Date();
  	return ndate;
  }





   get_training_Data(): Observable<any> {
    const index_details = JSON.parse(localStorage.getItem('local_store_value'));
    return this.http.post(environment.apiEndpoint + 'generate_training_score',{'index_details': index_details}).
    map(response => response.json());
  }

  // public getData<T>():Observable<T>{
  //   return this.http.post<T>('http://localhost:5000')
  // }
  public get_index(): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'get_index').
    map(response => response.json());
  }

  public getDoc(doc): Observable<any> {
    return this.http.post( environment.apiEndpoint + 'getdoc',{'id': doc.id})
    .map(response => response.json());
  }

  public add_training_service(index_details, selected_doc): Observable<any>{
    console.log(index_details, selected_doc);
    return this.http.post(environment.apiEndpoint + 'add_training_service',{'index_details': index_details, 'selected_doc': selected_doc})
    .map(response => response.json());
  }



  public get_index_service(): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'getdoc')
    .map(response => response.json());
  }

  public get_cal_index_service(cal_id): Observable<any> {
    return this.http.post(environment.apiEndpoint + 'get_cal_server',{'cal_id': cal_id})
    .map(response => response.json());
  }

  public create_cal_instance(args): Observable<any> {
    return this.http.post(environment.apiEndpoint + 'create_cal_instance',{'cal_inputs': args})
      .map(response => response.json());
  }

  public get_serarched_data(args): Observable<any> {
    return this.http.post(environment.apiEndpoint + 'get_search_word',{'search_text': args})
      .map(response => response.json());
  }

  public add_updated_service(selected_doc): Observable<any> {
    const index_details = JSON.parse(localStorage.getItem('local_store_value'));
    return this.http.post(environment.apiEndpoint + 'add_updated_service',{'index_details': index_details, 'selected_doc': selected_doc})
    .map(response => response.json());
    }

    public get_training_score(): Observable<any> {
    const index_details = JSON.parse(localStorage.getItem('local_store_value'));
     return this.http.post(environment.apiEndpoint + 'get_training_score',{'index_details': index_details})
    .map(response => response.json());

    }
}
