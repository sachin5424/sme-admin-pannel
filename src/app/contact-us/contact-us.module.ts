import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactUsRoutingModule } from './contact-us-routing.module';
import { ContactUsDashboardComponent } from './contact-us-dashboard/contact-us-dashboard.component';
import { ContactUsTableComponent } from './contact-us-table/contact-us-table.component';
import { ContactUsAddEditComponent } from './contact-us-add-edit/contact-us-add-edit.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { angularUIModule } from '../shared/material-ui.module';
import { CategoryService } from '../_http/api/services/category-service';
import { TextAuthInterceptor } from '../_http/HttpInterceptor';


@NgModule({
  declarations: [ContactUsDashboardComponent, ContactUsTableComponent, ContactUsAddEditComponent],
  imports: [
    CommonModule,
    ContactUsRoutingModule,
    FormsModule,
    HttpClientModule,
    angularUIModule,
    ReactiveFormsModule
  ],
  providers: [CategoryService,    { provide: HTTP_INTERCEPTORS, useClass: TextAuthInterceptor, multi: true }]
})
export class ContactUsModule { }
