import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { NewAddEditComponent } from '../new-add-edit/new-add-edit.component';

@Component({
  selector: 'app-new-dashboard',
  templateUrl: './new-dashboard.component.html',
  styleUrls: ['./new-dashboard.component.scss']
})
export class NewDashboardComponent implements OnInit {

  data = []
  constructor(public dialog: MatDialog, private _http:HttpClient,private toastr: ToastrService) {
  // this.openDialog()
  }


  openDialog() {
    const dialogRef = this.dialog.open(NewAddEditComponent,{  width:"100%",height:"60%",data:{status:"add",data:{}}});
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.get_category_list()
    });
  }

  ngOnInit(): void {
    this.get_category_list()
  }
  get_category_list(){
    this._http.get(environment.author_all_list).subscribe((res:any) => {
      this.toastr.success(res.message)
      this.data = res.data.result;
    })
  }
}
