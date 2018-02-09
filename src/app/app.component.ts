import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Observable} from "rxjs/Observable";

import 'rxjs/add/operator/map';

import { DataTable, DataTableTranslations, DataTableResource } from 'angular-4-data-table';
import { FirstserviceService } from './firstservice.service';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(){}

  	ngOnInit() {

  	}


  }
