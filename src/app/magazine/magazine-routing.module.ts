import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardMagazineComponent} from './dashboard-magazine/dashboard-magazine.component'

const routes: Routes = [
  {
    path: '',
    component:DashboardMagazineComponent

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MagazineRoutingModule { }
