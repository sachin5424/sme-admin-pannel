import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import { NewDashboardComponent } from './new-dashboard/new-dashboard.component';
import { NewTableComponent } from './new-table/new-table.component';
import { NewAddEditComponent } from './new-add-edit/new-add-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { angularUIModule } from '../shared/material-ui.module';
import { TextAuthInterceptor } from '../_http/HttpInterceptor';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MyCkEditorComponent } from '../my-ck-editor/my-ck-editor.component';

@NgModule({
  declarations: [NewDashboardComponent,MyCkEditorComponent, NewTableComponent, NewAddEditComponent],
  imports: [
    CommonModule,
    CKEditorModule,
    FormsModule,
    
    NewsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    angularUIModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TextAuthInterceptor, multi: true }
  ]

})
export class NewsModule { }
