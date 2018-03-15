import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSelectModule , MatInputModule , MatTableModule , MatFormFieldModule} from '@angular/material';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatRadioModule} from '@angular/material/radio';
import {MatPaginatorModule} from '@angular/material/paginator';



import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as FintTheme from 'fusioncharts/themes/fusioncharts.theme.fint';
import { FusionChartsModule } from 'angular4-fusioncharts';

import { AppComponent } from './app.component';
import { ChildAppcompComponent } from './child-appcomp/child-appcomp.component';
import { FirstserviceService } from './firstservice.service';
import { ShadesComponent } from './shades/shades.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { SearchFilterPipe } from './search-filter.pipe';
import { AddDocsComponent } from './add-docs/add-docs.component';
import { IllusionSetComponent } from './illusion-set/illusion-set.component';


FusionChartsModule.fcRoot(FusionCharts, Charts, FintTheme);

@NgModule({
  declarations: [
    AppComponent,
    ChildAppcompComponent,
    ShadesComponent,
    CreateProjectComponent,
    SearchFilterPipe,
    AddDocsComponent,
    IllusionSetComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatRadioModule,
    MatPaginatorModule,
    FusionChartsModule,


    RouterModule.forRoot([
      {
        path: 'add-docs',
        component: AddDocsComponent
      },
      {
      path: 'create-cmp',
      component: CreateProjectComponent
    },
    {
      path : 'training-cmp',
      component : ChildAppcompComponent
    },
    {
      path : 'shades-cmp',
      component : ShadesComponent
    }, {
      path : 'illusion-cmp',
      component : IllusionSetComponent
    }])
  ],
  providers: [FirstserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
