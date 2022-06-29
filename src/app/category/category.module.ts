import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { TableCategoryComponent } from './table-category/table-category.component';
import { CategoryDashboardComponent } from './category-dashboard/category-dashboard.component';
import { angularUIModule } from '../shared/material-ui.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CategoryService } from '../_http/api/services/category-service';
import { TextAuthInterceptor } from '../_http/HttpInterceptor';
import { addEditCategoryComponent } from './add-edit-category';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [TableCategoryComponent, CategoryDashboardComponent,addEditCategoryComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    FormsModule,
    HttpClientModule,
    angularUIModule,
    ReactiveFormsModule
  ],
  providers: [CategoryService,    { provide: HTTP_INTERCEPTORS, useClass: TextAuthInterceptor, multi: true }]
})
export class CategoryModule { }
