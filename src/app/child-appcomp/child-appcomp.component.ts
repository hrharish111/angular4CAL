import {Component, OnInit, ViewChild} from '@angular/core';
import { FirstserviceService } from '../firstservice.service';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {elementStart} from '@angular/core/src/render3/instructions';


@Component({
  selector: 'app-child-appcomp',
  templateUrl: './child-appcomp.component.html',
  styleUrls: ['./child-appcomp.component.css']
})
export class ChildAppcompComponent implements OnInit {

  public httpdata: any;
  public message: string;
  righttopper: any;
  error: any;

  selection = new SelectionModel<Element>(true, []);
  displayedColumns = ['doc_viewed', 'res_or_no' , 'doc_id', 'score'];
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;



    id = 'chart1';
    width = 400;
    height = 380;
    type = 'column2d';
    dataFormat = 'json';
    chartdata;
    title = 'Angular4 FusionCharts Sample';



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


  constructor(private firstservice: FirstserviceService) {



    this.firstservice.get_training_score().subscribe(data => {
        this.httpdata = data;
        const doc_id_score = [];
        this.httpdata.forEach(function (eachdata) {
          const object_key = String(eachdata.id);
          const object_value = eachdata.score;
          doc_id_score.push({label: object_key, value: object_value });
        });
        console.log(doc_id_score)
        this.chartdata = {'chart': {'caption' : 'word score graph', 'theme' : 'fint'
                                      },
                            'data': doc_id_score};
        this.dataSource = new MatTableDataSource(this.httpdata);
        this.dataSource.paginator = this.paginator;
      },

      err => {
        this.error = 'something went wrong';
      });







  }


  ngOnInit() {

}}
