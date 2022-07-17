import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { ContactUsAddEditComponent } from '../contact-us-add-edit/contact-us-add-edit.component';

@Component({
  selector: 'app-contact-us-dashboard',
  templateUrl: './contact-us-dashboard.component.html',
  styleUrls: ['./contact-us-dashboard.component.scss']
})
export class ContactUsDashboardComponent implements OnInit {

  data = []
  constructor(public dialog: MatDialog, private _http:HttpClient,private toastr: ToastrService) {
  
  }


  openDialog() {
    const dialogRef = this.dialog.open(ContactUsAddEditComponent,{  width:"450px",data:{status:"add",data:{}}});
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.get_category_list()
    });
  }

  ngOnInit(): void {
    // this.get_category_list()
  }
  get_category_list(){
    this._http.get(environment.contactUs).subscribe((res:any) => {
      this.toastr.success(res.message)
      this.data = res.data.result;
    })
  }


}
