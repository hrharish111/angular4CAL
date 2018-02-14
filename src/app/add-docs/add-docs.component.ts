import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {SearchFormdata} from './search_form_data';
import {FirstserviceService} from '../firstservice.service';
import {MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-docs',
  templateUrl: './add-docs.component.html',
  styleUrls: ['./add-docs.component.css']
})
export class AddDocsComponent implements OnInit {

  righttopper: any;


  search_form = new SearchFormdata()

  myControl_search: FormControl = new FormControl('', [ Validators.required]);
  get_related_docs: any;

  table_form: any[] = [];
  dataSource: any;
   displayedColumns: any;
   selection = new SelectionModel<Element>(true, []);




  search_words = function () {
    this.search_form.search_data = this.myControl_search.value;
    this.search_form.index_name = JSON.parse(localStorage.getItem('local_store_value')).index_name
    this.firstservice.get_serarched_data(this.search_form).subscribe((results: any) => {
      this.get_related_docs = results.hits.hits;
      this.dataSource = new MatTableDataSource(this.get_related_docs);
      this.displayedColumns = ['doc_viewed', 'res_or_no' , 'Doc_Id'];
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
    const index_details = JSON.parse(localStorage.getItem('local_store_value'))
    console.log('form is completely working fine');
    this.firstservice.add_training_service(index_details, selected_doc).subscribe(results  => {
      this.success_result = results;
      if (results) {
        console.log('add_doc_completed');
      }
       });
  };







  onSelectionChange = function(data) {
    console.log(data['_source']['itemText']);
    this.righttopper = data['_source']['itemText'];
    // this.firstservice.getDoc(data).subscribe(results  => {
       //  this.righttopper = results['_source']['itemText'];
       // });
  }

  checkResponsive = function(args, args2) {
    this.selection.selected.forEach(function (entry) {
      if (entry._id === args._id) {
          entry._source.responsive = args2;
      }
    });

  }

  constructor(private router: Router, private firstservice: FirstserviceService) { }

  ngOnInit() {
  }

}
