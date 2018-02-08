import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTableModule } from 'angular-4-data-table/src/index';





import { AppComponent } from './app.component';
import { ChildAppcompComponent } from './child-appcomp/child-appcomp.component';
import { FirstserviceService } from './firstservice.service';
import { ShadesComponent } from './shades/shades.component';


@NgModule({
  declarations: [
    AppComponent,
    ChildAppcompComponent,
    ShadesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,

    RouterModule.forRoot([
    {
    	path:'new-cmp',
    	component:ChildAppcompComponent
    },{
      path:'shades-cmp',
      component:ShadesComponent
    }])
  ],
  providers: [FirstserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
