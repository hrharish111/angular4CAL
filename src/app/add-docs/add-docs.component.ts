import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {SearchFormdata} from './search_form_data';
import {FirstserviceService} from '../firstservice.service';
import {MatPaginator , MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-docs',
  templateUrl: './add-docs.component.html',
  styleUrls: ['./add-docs.component.css']
})
export class AddDocsComponent implements OnInit {

  righttopper: any;
  success_result: any;
  add_doc_failed: any;


  search_form = new SearchFormdata()

  myControl_search: FormControl = new FormControl('', [ Validators.required]);
  get_related_docs: any;

  table_form: any[] = [];
  dataSource: any;
  displayedColumns: any;
  selection = new SelectionModel<Element>(true, []);

   @ViewChild(MatPaginator) paginator: MatPaginator;






  search_words = function () {
    this.search_form.search_data = this.myControl_search.value;
    this.search_form.index_name = JSON.parse(localStorage.getItem('local_store_value')).index_name
    this.firstservice.get_serarched_data(this.search_form).subscribe((results: any) => {
      this.get_related_docs = results.hits.hits;
      this.dataSource = new MatTableDataSource(this.get_related_docs);
      this.displayedColumns = ['doc_viewed', 'res_or_no' , 'Doc_Id'];
      this.dataSource.paginator = this.paginator;
    });
  };


   isAllSelected = function() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;

  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }



  add_training_doc = function () {

    const selected_doc = this.selection.selected;
    const idtagpairs = {};
    selected_doc.forEach(function(entry) {
      idtagpairs[entry._id] = entry._source.responsive;
    });
    const selected_doc_edited = {'IdTagPairs': idtagpairs, 'trainingSetId': '' };
    this.firstservice.add_training_service(selected_doc_edited).subscribe(results  => {
      this.success_result = results;
      if (results) {

        this.selection.clear();
        this.dataSource = this.search_words();
        this.firstservice.openDialog('add_doc_completed');
      }
       }, err => {
          this.success_result = 'error_in_form';
          this.firstservice.openDialog('error in form');
    });
  };


   predict_score = function() {
     console.log('clicked predict score');
     this.firstservice.create_predict_score().subscribe(results => {
       this.predict_result = results;
       if (results.status === 201) {
        alert('please be patience your data is predicting');
        location.reload();
       }
     }, err => {
       console.log(err);
       alert('something went wrong I am not predicting');

     });
   };






  onSelectionChange = function(data) {
    this.righttopper = data['_source']['itemText'];
    // this.firstservice.getDoc(data).subscribe(results  => {
       //  this.righttopper = results['_source']['itemText'];
       // });
  };

  checkResponsive = function(args, args2) {
    this.selection.selected.forEach(function (entry) {
      if (entry._id === args._id) {
          entry._source.responsive = args2;
      }
    });

  };


   applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  constructor(private router: Router, private firstservice: FirstserviceService) { }

  ngOnInit() {
}


}
