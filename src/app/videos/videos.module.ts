import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideosRoutingModule } from './videos-routing.module';
import { VideosDashboardComponent } from './videos-dashboard/videos-dashboard.component';
import { VideosTableComponent } from './videos-table/videos-table.component';
import { VideosAddEditComponent } from './videos-add-edit/videos-add-edit.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { angularUIModule } from '../shared/material-ui.module';
import { TextAuthInterceptor } from '../_http/HttpInterceptor';


@NgModule({
  declarations: [VideosDashboardComponent, VideosTableComponent, VideosAddEditComponent],
  imports: [
    CommonModule,
    VideosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    angularUIModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TextAuthInterceptor, multi: true }
  ]
})
export class VideosModule { }
