import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TableCategoryComponent} from './table-category/table-category.component';
import {CategoryDashboardComponent} from './category-dashboard/category-dashboard.component';
const routes: Routes = [
  {
    path: 'category', component:CategoryDashboardComponent
  },
  { path: '**', redirectTo: 'category', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
