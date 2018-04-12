import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import {FirstserviceService} from '../firstservice.service';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-influential-cmp',
  templateUrl: './influential-cmp.component.html',
  styleUrls: ['./influential-cmp.component.css']
})
export class InfluentialCmpComponent implements OnInit {
  index_name: any;
   no_of_docs: FormControl = new FormControl('', [ Validators.required]);
   selected_index: any;
   righttopper: any;

   dataSource: any;
  displayedColumns: any;
  selection = new SelectionModel<Element>(true, []);

   @ViewChild(MatPaginator) paginator: MatPaginator;


  influential_submit = function () {
    this.firstservice.get_influential_sample(this.selected_index, this.no_of_docs.value).subscribe((results: any) => {
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
        this.influential_submit();
        alert('added your influential samples');

      }
       }, err => {
        alert('some thing went wrong');
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
        alert('please be patient you prediction is running..');
        location.reload();
      }
    }, err => {
      alert('please check there is a duplicate job');
      this.predict_result = 'error in predict score';
    });
  }



  constructor( private firstservice: FirstserviceService) { }

  ngOnInit() {

    this.firstservice.get_index().subscribe(data => {this.index_name = data;
    this.index_name = ['ng_index']; });
  }

}
