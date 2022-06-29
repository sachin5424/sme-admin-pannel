import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdsRoutingModule } from './ads-routing.module';
import { AdsTableComponent } from './ads-table/ads-table.component';
import { AdsAddEditComponent } from './ads-add-edit/ads-add-edit.component';
import { AdsDashboardComponent } from './ads-dashboard/ads-dashboard.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { angularUIModule } from '../shared/material-ui.module';
import { TextAuthInterceptor } from '../_http/HttpInterceptor';


@NgModule({
  declarations: [ AdsTableComponent, AdsAddEditComponent, AdsDashboardComponent],
  imports: [
    CommonModule,
    FormsModule,
    AdsRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    angularUIModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TextAuthInterceptor, multi: true }
  ]
})
export class AdsModule { }
