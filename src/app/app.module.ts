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
import {MatSelectModule} from '@angular/material';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material';
import {MatInputModule} from '@angular/material';
import {MatTableModule} from '@angular/material';
import {MatRadioModule} from '@angular/material/radio';


import { AppComponent } from './app.component';
import { ChildAppcompComponent } from './child-appcomp/child-appcomp.component';
import { FirstserviceService } from './firstservice.service';
import { ShadesComponent } from './shades/shades.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { SearchFilterPipe } from './search-filter.pipe';
import { AddDocsComponent } from './add-docs/add-docs.component';


@NgModule({
  declarations: [
    AppComponent,
    ChildAppcompComponent,
    ShadesComponent,
    CreateProjectComponent,
    SearchFilterPipe,
    AddDocsComponent,

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
    	path:'training-cmp',
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
