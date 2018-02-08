import { Component, OnInit } from '@angular/core';
import { FirstserviceService } from '../firstservice.service';


@Component({
  selector: 'app-child-appcomp',
  templateUrl: './child-appcomp.component.html',
  styleUrls: ['./child-appcomp.component.css']
})
export class ChildAppcompComponent implements OnInit {
  
  public httpdata:any;
  public message:string;
  leftbottom="I am leftbottom"
  lefttopper = "I am lefttopper"
  righttopper = "I am righttopper"
  rightbottom = "I am rightbottomer"
  onSelectionChange:any;
  checkResponsive:any;
  error:any;


  
  constructor(private firstservice: FirstserviceService) { 

    this.onSelectionChange = function(data){
       this.firstservice.getDoc(data).subscribe(data=>{
        this.righttopper=data["_source"]["itemText"];
       });
  }

    this.checkResponsive = function(args,args2) {
    console.log(args,args2);
  }



  }

  
  ngOnInit() {
     // this.firstservice.getDataCal<any[]>().subscribe((data:any[]) => this.httpdata = data,
     //  error =>() =>{
     //    this.message = "something went wrong";
     //  })
     this.firstservice.getData().subscribe(data =>{
        this.httpdata=data;
      },

      err => {
        this.error = "something went wrong";
      });

     

}}