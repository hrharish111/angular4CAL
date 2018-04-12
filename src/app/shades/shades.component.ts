import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {merge} from 'rxjs/observable/merge';
import {of as observableOf} from 'rxjs/observable/of';
import {catchError} from 'rxjs/operators/catchError';
import {map} from 'rxjs/operators/map';
import {startWith} from 'rxjs/operators/startWith';
import {switchMap} from 'rxjs/operators/switchMap';
import {FirstserviceService} from '../firstservice.service';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-shades',
  templateUrl: './shades.component.html',
  styleUrls: ['./shades.component.css']
})
export class ShadesComponent implements OnInit {
  httpdata: any;
  chartdata: any;
  righttopper: any;

  dataSource: any;
  error: any;
  selection = new SelectionModel<Element>(true, []);
  displayedColumns = ['doc_viewed', 'res_or_no' , 'doc_id', 'score'];

   // config details can be addes here
  config_data: any;

   @ViewChild(MatSort) sort: MatSort;


   id = 'chart1';
    width = 400;
    height = 380;
    type = 'column2d';
    dataFormat = 'json';
    title = 'Angular4 FusionCharts Sample';



    // pagination

   length: number;
    pageIndex = 0;
    pageSize = 10;


    add_updated_doc = function () {
    const selected_doc = this.selection.selected;
    const idtagpairs = {};
    selected_doc.forEach(function(entry) {
      console.log(entry);
      idtagpairs[entry.id] = entry.responsive;
    });
    const selected_doc_edited = {'IdTagPairs': idtagpairs, 'trainingSetId': '' };
    this.firstservice.add_training_service(selected_doc_edited).subscribe(results  => {
      this.success_result = results;
      if (results) {
        this.selection.clear();
        this.dataSource = this.load_data();
        console.log('add_doc_completed');
      }
       }, err => {
          this.success_result = 'error_in_form';
    });
  };

  // predict_score = function() {
  //    console.log('clicked predict score');
  //    this.firstservice.create_predict_score().subscribe(results => {
  //      this.predict_result = results;
  //      if (results) {
  //        location.reload();
  //      }
  //    }, err => {
  //      this.predict_result = 'error in predict score';
  //    });
  //  }

   predict_score = function() {
    console.log('clicked predict score');
    this.firstservice.create_predict_score().subscribe(results => {
      this.predict_result = results;
      if (results.status === 201) {
        alert('please be patience your data is predicting')
        location.reload();
      } else if (results.status === 501) {
        alert('Duplicate job please be patience..');
      } else {
        alert('Something went wrong');
      }
    }, err => {
      if (err.status === 501) {
      alert('Duplicate job please be patience..');
    } else {
      alert('something is not correct');
    }
    });
  };



  onSelectionChange = function(data) {
    this.firstservice.getDocData(data).subscribe(results  => {
        this.righttopper = results['_source']['itemText'];
       });
  };


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }


  checkResponsive = function(args, args2) {
    console.log(args, args2)
    this.selection.selected.forEach(function (entry) {
      if (args.id === entry.id ) {
          console.log(entry)
          entry.responsive = args2;
      }
    });

  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  load_data() {
    this.firstservice.get_training_score_test(this.pageIndex * 10).subscribe(data => {
        this.httpdata = data;
        const new_http_data = [];
        const doc_id_score = [];
        let i = 0;
        for (i = 0; i < this.httpdata.ids.length; i++ ) {
            doc_id_score.push({label: this.httpdata.ids[i] , value: this.httpdata.scores[i]});
            new_http_data.push({'id': this.httpdata.ids[i], 'score': this.httpdata.scores[i]});
        }

        console.log(doc_id_score);
        this.chartdata = {
          'chart': {
            'caption': 'word score graph', 'theme': 'fint'
          },
          'data': doc_id_score
        };
        this.length = data.total_docs;
        // this.setPagination(this.length, this.pageIndex, doc_id_score.length )
        this.dataSource = new MatTableDataSource(new_http_data);


      },

      err => {
        this.error = 'something went wrong';
      });

  }

  // setPagination(length, startIndex, pageSize ) {
  //   this.length = length;
  //   this.pageIndex = startIndex;
  //   this.pageSize = pageSize;
  // }

  onPaginateChange(event) {
        this.length = this.length;
        this.pageIndex = event.pageIndex;
        this.load_data();
    }

  constructor(private firstservice: FirstserviceService) {





    }

  ngOnInit() {
    this.load_data();
  }

}


