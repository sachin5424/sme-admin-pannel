import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdsDashboardComponent} from './ads-dashboard/ads-dashboard.component'
const routes: Routes = [
  {
    path: '',
    component:AdsDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdsRoutingModule { }
