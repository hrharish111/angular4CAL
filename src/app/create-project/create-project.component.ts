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
  myControl_cal: FormControl = new FormControl('',[Validators.required]);
  myControl_itter: FormControl = new FormControl('',[Validators.required]);
  cal_index_list: any;

  get_Cal_index =  function(args) {
        console.log(args);
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
      console.log(results)
      if (results['success'] === true) {
            this.router.navigate(['/add-docs']);
       } else {
        console.log('failed in creating project');
      }
    });
    console.log(this.form_data);

  }



  constructor(private router: Router,
              private firstService: FirstserviceService) {
  }

  ngOnInit() {
      this.firstService.get_index().subscribe(data => {this.list_index = data; });

  }


  }



