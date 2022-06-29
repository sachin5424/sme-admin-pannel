import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommentDashboardComponent } from './comment-dashboard/comment-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component:CommentDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommentRoutingModule { }
