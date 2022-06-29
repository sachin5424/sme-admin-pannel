import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorRoutingModule } from './author-routing.module';
import { AuthorTableComponent } from './author-table/author-table.component';
import { AuthorDashboardComponent } from './author-dashboard/author-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { angularUIModule } from '../shared/material-ui.module';
import { TextAuthInterceptor } from '../_http/HttpInterceptor';
import { AddEditAuthorComponent } from './add-edit-sub-author/add-edit-author.component';


@NgModule({
  declarations: [ AuthorTableComponent, AuthorDashboardComponent, AddEditAuthorComponent],
  imports: [
    CommonModule,
    AuthorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    angularUIModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TextAuthInterceptor, multi: true }
  ]
})
export class AuthorModule { }
