import {Component, OnInit, ViewChild} from '@angular/core';
import {FirstserviceService} from '../firstservice.service';
import {FormControl, Validators} from '@angular/forms';
import {EllusionConfigForm} from './ellusionform';
import {MatPaginator , MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-illusion-set',
  templateUrl: './illusion-set.component.html',
  styleUrls: ['./illusion-set.component.css']
})
export class IllusionSetComponent implements OnInit {
  default_config: any;
  righttopper: any;
  status_result = true;
  stats_result_false_negative: any;
  stats_result_margin_of_error: any;

  ellusion_config_form = new EllusionConfigForm()
  confidence_level: FormControl = new FormControl('', [Validators.required] );
  min_score: FormControl = new FormControl('', [Validators.required] );
  num_samples: FormControl = new FormControl('', [Validators.required] );
  sampling: FormControl = new FormControl('', [Validators.required] );
  ellusion_name: FormControl = new FormControl('', [Validators.required] );
  ellusion_result: any;
  ellusion_ids: any;
  displayedColumns: any;
  selection = new SelectionModel<Element>(true, []);

   @ViewChild(MatPaginator) paginator: MatPaginator;

  load_config() {
    this.firstservice.get_default_ellusion_config().subscribe(data => {

      this.default_config = data;
      console.log(this.default_config);

    });
  }

  create_ellusion() {
    this.ellusion_config_form.confidence_level = this.confidence_level.value;
    this.ellusion_config_form.min_score = this.min_score.value;
    this.ellusion_config_form.num_samples = this.num_samples.value;
    this.ellusion_config_form.sampling = this.sampling.value;
    this.ellusion_config_form.ellusion_name = this.ellusion_name.value;
    const index_details = JSON.parse(localStorage.getItem('local_store_value'))
    const ellusion_storage = JSON.stringify(this.ellusion_config_form)
    localStorage.setItem('ellusion_data', ellusion_storage )
    this.firstservice.create_ellusion_test(index_details, this.ellusion_config_form).subscribe(data => {
      this.ellusion_result = data.results;
      alert('created');
    });
  }

   isAllSelected = function() {
    const numSelected = this.selection.selected.length;
    const numRows = this.ellusion_ids.data.length;
    return numSelected === numRows;

  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.ellusion_ids.data.forEach(row => this.selection.select(row));
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
    this.ellusion_ids.filter = filterValue;
  }

  onSelectionChange = function(data) {
    this.firstservice.getDoc(data).subscribe(results  => {
        this.righttopper = results['_source']['itemText'];
       });
  };


   add_ellusion_doc = function () {

    const selected_doc = this.selection.selected;
    const index_details = JSON.parse(localStorage.getItem('local_store_value'))
     const ellusion_details = JSON.parse(localStorage.getItem('ellusion_data'))
    console.log('form is completely working fine');
    this.firstservice.add_marked_ids_to_ellusion_test(index_details, ellusion_details , selected_doc).subscribe(results  => {
      this.success_result = results;
      console.log(results)
      if (results) {
        alert('add_ellusion_completed');
        this.selection.clear();
      }
       }, err => {
          this.success_result = 'error_in_form';
    });
  };


   create_stats = function() {
     const index_details = JSON.parse(localStorage.getItem('local_store_value'))
     const ellusion_details = JSON.parse(localStorage.getItem('ellusion_data'))
     this.firstservice.get_stats_for_ellusion_test(index_details, ellusion_details).subscribe(
       data => {
         console.log(data);
         this.status_result = false;
         this.stats_result_false_negative = data.false_negative;
         this.stats_result_margin_of_error = data.margin_of_error;
       }
     );
  }



  generate_ellusion_ids() {
        const index_details = JSON.parse(localStorage.getItem('local_store_value'))

          const ellusion_details = JSON.parse(localStorage.getItem('ellusion_data'))
          if (ellusion_details != null) {
            this.firstservice.get_ellusion_test_ids(index_details, ellusion_details).subscribe(
            data => {
              this.ellusion_ids = new MatTableDataSource(data);
              this.displayedColumns = ['doc_viewed', 'res_or_no' , 'Doc_Id'];
              this.ellusion_ids.paginator = this.paginator;
            }
          );
          } else {
          alert('no ellusion details found');
          }


  }

  constructor(private firstservice: FirstserviceService) {
      this.firstservice.get_default_ellusion_config().subscribe(data => {

      this.default_config = data;
      console.log(this.default_config);

    });
  }

  ngOnInit() {

  }

}
