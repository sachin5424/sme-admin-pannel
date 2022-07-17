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
import { NgxPaginationModule } from 'ngx-pagination';
import { JwPaginationModule } from 'jw-angular-pagination';

@NgModule({
  declarations: [ AuthorTableComponent, AuthorDashboardComponent, AddEditAuthorComponent],
  imports: [
    CommonModule,
    AuthorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    angularUIModule,
    NgxPaginationModule,
    JwPaginationModule
  ],
  providers: [
    NgxPaginationModule,
    { provide: HTTP_INTERCEPTORS, useClass: TextAuthInterceptor, multi: true }
  ]
})
export class AuthorModule { }
