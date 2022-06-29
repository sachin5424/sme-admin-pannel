import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactUsDashboardComponent } from './contact-us-dashboard/contact-us-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component:ContactUsDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactUsRoutingModule { }
