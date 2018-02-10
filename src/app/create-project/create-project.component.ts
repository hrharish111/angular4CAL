import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { FirstserviceService } from '../firstservice.service';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css'],
  providers: [FirstserviceService]
})
export class CreateProjectComponent implements OnInit {
  list_index: any;
  filter_name: any;
  selected_menu = function (sel_value) {
    this.filter_name = sel_value;
    console.log('somethhing is working');

  }

  constructor(private firstService: FirstserviceService) {
  }

  ngOnInit() {
      this.firstService.get_index().subscribe(data => {this.list_index = data; });
  }


  }



