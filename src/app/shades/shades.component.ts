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
    pageSize: any;


    add_updated_doc = function () {
    const selected_doc = this.selection.selected;
    this.firstservice.add_updated_service(selected_doc).subscribe(results  => {
      this.success_result = results;
      if (results) {
        console.log('page get reloaded to generate score');
        location.reload();
      }
       });
  }

  predict_score = function() {
     console.log('clicked predict score');
     this.firstservice.get_training_Data().subscribe(results => {
       this.predict_result = results;
       if (results) {
         location.reload();
       }
     }, err => {
       this.predict_result = 'error in predict score';
     });
   }


  onSelectionChange = function(data) {
    this.firstservice.getDoc(data).subscribe(results  => {
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
    this.selection.selected.forEach(function (entry) {
      console.log(entry);
      if (entry._id === args._id) {
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
    this.firstservice.get_training_score_test(this.pageIndex).subscribe(data => {

        this.httpdata = data['_source'];
        const doc_id_score = [];
        this.httpdata.forEach(function (eachdata) {
          const object_key = String(eachdata.id);
          const object_value = eachdata.score;
          doc_id_score.push({label: object_key, value: object_value});
        });
        console.log(doc_id_score)
        this.chartdata = {
          'chart': {
            'caption': 'word score graph', 'theme': 'fint'
          },
          'data': doc_id_score
        };
        this.length = data.total_page * 10;
        this.setPagination(this.length, this.pageIndex, doc_id_score.length )
        this.dataSource = new MatTableDataSource(this.httpdata);


      },

      err => {
        this.error = 'something went wrong';
      });

  }

  setPagination(length, startIndex, pageSize ) {
    this.length = length;
    this.pageIndex = startIndex;
    this.pageSize = pageSize;
  }

  onPaginateChange(event) {
        this.length = this.length
        this.pageIndex = event.pageIndex;
        this.load_data();
    }

  constructor(private firstservice: FirstserviceService) {





    }

  ngOnInit() {
    this.load_data();
  }

}


