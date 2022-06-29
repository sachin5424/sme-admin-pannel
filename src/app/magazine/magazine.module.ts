import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MagazineRoutingModule } from './magazine-routing.module';
import { AddEditMagazineComponent } from './add-edit-magazine/add-edit-magazine.component';
import { TableMagazineComponent } from './table-magazine/table-magazine.component';
import { DashboardMagazineComponent } from './dashboard-magazine/dashboard-magazine.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { angularUIModule } from '../shared/material-ui.module';
import { TextAuthInterceptor } from '../_http/HttpInterceptor';
import { PdfViewerModule } from 'ng2-pdf-viewer';


@NgModule({
  declarations: [AddEditMagazineComponent, TableMagazineComponent, DashboardMagazineComponent],
  imports: [
    CommonModule,
    MagazineRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    angularUIModule,
    PdfViewerModule,
  
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TextAuthInterceptor, multi: true }
  ]
})
export class MagazineModule { }
