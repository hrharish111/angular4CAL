import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import {FirstserviceService} from '../firstservice.service';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-diversity-sample',
  templateUrl: './diversity-sample.component.html',
  styleUrls: ['./diversity-sample.component.css']
})
export class DiversitySampleComponent implements OnInit {
  index_name: any;
  no_of_docs: FormControl = new FormControl('', [ Validators.required]);
  block_coverage: FormControl = new FormControl('', [ Validators.required]);
  max_distance: FormControl = new FormControl('', [ Validators.required]);
  // selected_index: any;
  righttopper: any;

  dataSource: any;
 displayedColumns: any;
 selection = new SelectionModel<Element>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;


 diversity_submit = function () {
   console.log('something crossed over me');
   const diversity_datas = {
     'no_of_docs': this.no_of_docs.value,
     'block_coverage': this.block_coverage.value,
     'max_distance': this.max_distance.value
   };
   this.firstservice.create_diversity_samples(diversity_datas).subscribe((results: any) => {
    if (results.status === 201){
      alert('please be patience diversity samples are generating')
    }
   });


 };

 get_diversity_ids = function() {
   this.firstservice.get_diversity_ids_service().subscribe( results => {
    const final_results = [];
    results.forEach(function (entry) {
      final_results.push({'id': entry});

    });
    this.get_related_docs = final_results;
    this.dataSource = new MatTableDataSource(this.get_related_docs);
      this.displayedColumns = ['doc_viewed', 'res_or_no' , 'Doc_Id'];
      this.dataSource.paginator = this.paginator;
   });
 };

 selected_menu = function (sel_value) {
   this.selected_index = sel_value;

 }


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

  checkResponsive = function(args, args2) {
   console.log(args, args2)
   this.selection.selected.forEach(function (entry) {
     if (args.id === entry.id ) {
         console.log(entry)
         entry.responsive = args2;
     }
   });

 }


 onSelectionChange = function(data) {
     this.firstservice.getDocData({'id': data.id }).subscribe(results  => {
       this.righttopper = results['_source']['itemText'];
      });
 }


  applyFilter(filterValue: string) {
   filterValue = filterValue.trim(); // Remove whitespace
   filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
   this.dataSource.filter = filterValue;
 }

 status_influential_submit = function () {
   // const index_info = JSON.parse(localStorage.getItem('local_store_value'))
   // console.log(index_info)
   // const index_details = index_info.index_name;
   // const cal_name = index_info.cal_index;
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
       this.get_diversity_ids();
       this.firstservice.openDialog('added your diversity samples');

     }
      }, err => {
       this.firstservice.openDialog('some thing went wrong');
         this.success_result = 'error_in_form';
   });
 };


 // create_stats_influential = function() {
 //    const index_details = JSON.parse(localStorage.getItem('local_store_value'))
 //    this.firstservice.create_stats_influential_service(index_details).subscribe(
 //      data => {
 //        console.log(data);
 //        alert('successful');
 //      }
 //    );
 // }
 predict_score = function() {
   console.log('clicked predict score');
   this.firstservice.create_predict_score().subscribe(results => {
     this.predict_result = results;
     if (results) {
       this.firstservice.openDialog('please be patient you prediction is running..');
       alert('prediction is going on please be patience.....');
       location.reload();
     }
   }, err => {
     this.firstservice.openDialog('please check there is a duplicate job');
     this.predict_result = 'error in predict score';
   });
 };



 constructor( private firstservice: FirstserviceService) { }

 ngOnInit() {

   this.firstservice.get_index().subscribe(data => {this.index_name = data;
   this.index_name = ['ng_index']; });
 }

}



