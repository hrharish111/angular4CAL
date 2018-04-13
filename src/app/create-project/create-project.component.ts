import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { FirstserviceService } from '../firstservice.service';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import { Router } from '@angular/router';
import {FormdataDetails} from './form_data_details';


@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css'],
  providers: [FirstserviceService]
})
export class CreateProjectComponent implements OnInit {
  list_index: any;
  form_data = new FormdataDetails();
  myControl_cal: FormControl = new FormControl('', [ Validators.required]);
  myControl_itter: FormControl = new FormControl('', [ Validators.required]);
  cal_index_list: any;

  filteredOptions: Observable<string[]>;

  get_Cal_index =  function(args) {
        this.firstService.get_cal_index_service(args).subscribe(data => {this.cal_index_list = data; });
      };


  selected_menu = function (sel_value) {
    this.form_data.index_name = sel_value;
    this.get_Cal_index(sel_value);
    console.log(this.cal_index_list);
    console.log('somethhing is working');

  }




  create_project = function () {
    this.form_data.cal_index = this.myControl_cal.value;
    localStorage.setItem('local_store_value', JSON.stringify(this.form_data));
    this.firstService.create_cal_instance(this.form_data).subscribe(results => {
      console.log(results);
      if (results.status === 201) {
            this.firstService.openDialog('Cal new model created');
            this.router.navigate(['/add-docs']);
       } else {
        this.firstService.openDialog('failed in creating project');
      }
    }, error => {
      if (error.status === 403){
        this.firstService.openDialog('Cal Name alread exists redirecting....')
      this.router.navigate(['/add-docs']);
    } else {
      this.firstService.openDialog('something went wrong')
    }
    });
    console.log(this.form_data);

  };

  delete_project = function () {
    const index_details = JSON.parse(localStorage.getItem('local_store_value'));
    if(index_details) {
    this.firstService.delete_project_data().subscribe( results => {
      if (results.status === 201) {
        this.firstService.openDialog('Success fully deleted your' + localStorage.getItem('local_store_value') + 'details');
        localStorage.clear();
      } else {
        this.firstService.openDialog('something went wrong');
      }
    });
  };
    console.log('delete_project');
  };






  constructor(private router: Router,
              private firstService: FirstserviceService) {
  }

  ngOnInit() {
      this.firstService.get_index().subscribe(data => {this.list_index = data;
      // commented for testing purpose this.list_index
      this.list_index = ['ng_index'];
      });

  }


  }





