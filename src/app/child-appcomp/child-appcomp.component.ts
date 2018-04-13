import {Component, OnInit, ViewChild} from '@angular/core';
import { FirstserviceService } from '../firstservice.service';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';







@Component({
  selector: 'app-child-appcomp',
  templateUrl: './child-appcomp.component.html',
  styleUrls: ['./child-appcomp.component.css']
})
export class ChildAppcompComponent implements OnInit {

  config_add: FormControl = new FormControl('', [ Validators.required]);

  Get_Deaults = function() {
    this.firstservice.get_cal_default_config_service().subscribe(result => {
      console.log(result);
      const response = 'configOptions \n algoNames : ' + result.configOptions.algoNames
      + '\n corpous space : ' + result.configOptions.corpusSpaces + '\n extra samples : ' +
      JSON.stringify(result.configOptions.extraSampling) + '\n tag_map : ' + JSON.stringify(result.configOptions.tagMap) +
      '\n----------------------' + 'default_config -------------------- \n {"config" :' + JSON.stringify(result.defaultConfig) + '}';
      this.firstservice.openDialog(response);
    });
  };

  Get_Existing_Config = function() {
    this.firstservice.get_cal_present_config_service().subscribe(result => {
      this.firstservice.openDialog(JSON.stringify(result));
    }, error => {
      this.firstservice.openDialog('No default config avaliable');
    });
  };


  set_config = function() {
    try {
      const config_json = JSON.parse(this.config_add.value);
      if (config_json.config) {
        this.firstservice.set_cal_config_service(config_json).subscribe(result => {
          if (result.status === 201) {
          this.firstservice.openDialog('success');
        }
        }, error => {
          this.firstservice.openDialog('failed to add config');
        }); } else {
          this.firstservice.openDialog('input is not valid something is wrong');
        }
    } catch {
        this.firstservice.openDialog('Not a valid JSON');
    }

  };










  constructor(private firstservice: FirstserviceService) { }


  ngOnInit() {

}}




