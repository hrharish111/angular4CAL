import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
 import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../environments/environment';

@Injectable()
export class FirstserviceService {


  constructor(private http: Http, private _http: HttpClient) { }
  showTodayDate(){
  	let ndate = new Date();
  	return ndate;
  }





   create_predict_score(): Observable<any> {
    const index_details = JSON.parse(localStorage.getItem('local_store_value'));
    return this.http.post(environment.apiEndpoint + 'index/' + index_details.index_name + '/cal/' + index_details.cal_index
        + '?op=generateScores&collectionId=1', {}).
    map(response => response);
  }

  delete_project_data(): Observable<any> {
    const index_details = JSON.parse(localStorage.getItem('local_store_value'));
    return this.http.delete(environment.apiEndpoint + 'index/' + index_details.index_name  + '/cal/' + index_details.cal_index , {}).
    map(response => response);
  }

  // public getData<T>():Observable<T>{
  //   return this.http.post<T>('http://localhost:5000')
  // }
  public get_index(): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'index').
    map(response => response.json());
  }

  public getDocData(doc): Observable<any> {
    const index_details = JSON.parse(localStorage.getItem('local_store_value'));
    return this.http.get( environment.apiEndpoint + 'index/' + index_details.index_name + '/get_doc_details/'
      + doc.id )
    .map(response => response.json());
  }

  public add_training_service(selected_doc): Observable<any>{
    const index_details = JSON.parse(localStorage.getItem('local_store_value'));
    console.log(selected_doc);
    return this.http.post(environment.apiEndpoint + 'index/' + index_details.index_name +
    '/cal/' + index_details.cal_index + '/training_set?op=addIdTagPairs' , selected_doc);
    }



  public get_index_service(): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'getdoc')
    .map(response => response.json());
  }

  public get_cal_index_service(parent_id): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'index/' + parent_id + '/cal')
    .map(response => response.json());
  }

  public create_cal_instance(args): Observable<any> {
    return this.http.put(environment.apiEndpoint + 'index/' + args.index_name + '/cal/' + args.cal_index, {})
      .map(response => response);
  }

  public get_serarched_data(args): Observable<any> {
    return this.http.post(environment.apiEndpoint + 'index/' + args.index_name + '/get_search_doc', {'search_text': args.search_data})
      .map(response => response.json());
  }

  // public add_updated_service(selected_doc): Observable<any> {
  //   const index_details = JSON.parse(localStorage.getItem('local_store_value'));
  //   return this.http.post(environment.apiEndpoint + 'index/' +  index_details.index_name +
  //   '/cal/' + index_details.cal_index, {'selected_doc': selected_doc})
  //   .map(response => response.json());
  //   }

  public get_cal_default_config_service(): Observable<any> {
    const index_details = JSON.parse(localStorage.getItem('local_store_value'));
    return this.http.get(environment.apiEndpoint + 'index/' + index_details.index_name + '/cal/'
    + index_details.cal_index + '?op=getDefaultConfig').map(response => response.json());
  }

  public get_cal_present_config_service(): Observable<any> {
    const index_details = JSON.parse(localStorage.getItem('local_store_value'));
    return this.http.get(environment.apiEndpoint + 'index/' + index_details.index_name + '/cal/'
    + index_details.cal_index + '?op=getCalConfig').map(response => response.json());
  }

  public set_cal_config_service(config_data): Observable<any> {
    const index_details = JSON.parse(localStorage.getItem('local_store_value'));
    return this.http.post(environment.apiEndpoint + 'index/' + index_details.index_name + '/cal/'
    + index_details.cal_index + '?op=setConfig', config_data).map(response => response);

  }

  public get_training_score(): Observable<any> {
    const index_details = JSON.parse(localStorage.getItem('local_store_value'));
     return this.http.post(environment.apiEndpoint + 'get_training_score',{'index_details': index_details})
    .map(response => response.json());

    }

  public get_training_score_test(pageIndex): Observable<any> {
    console.log(pageIndex);
    const index_details = JSON.parse(localStorage.getItem('local_store_value'));
    return this.http.get(environment.apiEndpoint + 'index/' + index_details.index_name + '/cal/'
          + index_details.cal_index + '/scores/1?limit=10&start=' + pageIndex)
    .map(response => response.json());

    }

  public get_default_ellusion_config(): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'get_ellusion_test_config')
      .map(response => response.json());
  }

  public create_ellusion_test(index_details, require_input): Observable<any> {
    return this.http.post(environment.apiEndpoint + 'create_ellusion_test',
    {'index_details': index_details, 'elusion_test_name': require_input})
      .map(response => response.json());
  }

  public get_ellusion_test_ids(index_details, ellusion_data ): Observable<any> {
    return this.http.post(environment.apiEndpoint
      + 'get_ellusion_test_ids', {'index_details': index_details, 'ellusion_data' : ellusion_data})
      .map(response => response.json());
  }


  public add_marked_ids_to_ellusion_test(index_details, ellusion_data , changed_sample): Observable <any> {
    return this.http.post(environment.apiEndpoint + 'add_marked_ids_to_ellusion_test', {'index_details': index_details,
      'ellusion_data': ellusion_data, 'changed_sample' : changed_sample}).map(response => response.json());
  }

  public get_stats_for_ellusion_test(index_details, ellusion_data): Observable <any>{
    return this.http.post(environment.apiEndpoint + 'get_stats_for_ellusion_test', {'index_details': index_details,
      'ellusion_data': ellusion_data}).map(response => response.json());
  }


//  influential service starts here

  public get_influential_sample(index_name, no_of_docs): Observable<any>{

    return this.http.get(environment.apiEndpoint + 'index' + '/' + index_name + '/influential_samples?count=' + no_of_docs)
      .map(response => response.json());
  }


  // public add_marked_influence(index_name, cal_name, training_doc): Observable <any>{
  //   const  influence_data = {
  //     'index_name': index_name,
  //     'cal_name': cal_name,
  //     'training_doc': training_doc
  //   }
  //   return this.http.post(environment.apiEndpoint + 'genereate_centroid',{'influence_data': influence_data})
  //     .map(response => response.json())
  // }

  // public create_stats_influential_service(influence_data): Observable <any>{
  //   return this.http.post(environment.apiEndpoint + 'finish_centroid',{'influence_data': influence_data})
  //     .map(response => response.json());
  // }


    public get_stats_list(): Observable <any>{
      const index_details = JSON.parse(localStorage.getItem('local_store_value'));
      return this.http.get(environment.apiEndpoint + 'index/' + index_details.index_name +
       '/cal/' + index_details.cal_index + '/stats')
       .map(response => response.json());
    }

    public get_histogram_data_service(histogram_graph_data): Observable <any> {
      const index_details = JSON.parse(localStorage.getItem('local_store_value'));
      return this.http.get(environment.apiEndpoint + 'index/' + index_details.index_name +
       '/cal/' + index_details.cal_index + '/stats/' + histogram_graph_data)
       .map(response => response.json());
    }


  // dailyForecast() {
  //   return this._http.get(environment.apiEndpoint + 'weather_display')
  //     .map(result => result);
  // }







}
