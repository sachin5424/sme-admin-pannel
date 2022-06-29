import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommentRoutingModule } from './comment-routing.module';
import { AddEditCommentComponent } from './add-edit-comment/add-edit-comment.component';

import { CommentTableComponent } from './comment-table/comment-table.component';
import { CommentDashboardComponent } from './comment-dashboard/comment-dashboard.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { angularUIModule } from '../shared/material-ui.module';
import { TextAuthInterceptor } from '../_http/HttpInterceptor';


@NgModule({
  declarations: [AddEditCommentComponent, CommentTableComponent, CommentDashboardComponent],
  imports: [
    CommonModule,
    CommentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    angularUIModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TextAuthInterceptor, multi: true }
  ]
})
export class CommentModule { }
