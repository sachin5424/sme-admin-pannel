import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { AddEditAuthorComponent } from '../add-edit-sub-author/add-edit-author.component';

@Component({
  selector: 'app-author-dashboard',
  templateUrl: './author-dashboard.component.html',
  styleUrls: ['./author-dashboard.component.scss']
})
export class AuthorDashboardComponent implements OnInit {
  data = []
  constructor(public dialog: MatDialog, private _http:HttpClient,private toastr: ToastrService) {
  
  }


  openDialog() {
    const dialogRef = this.dialog.open(AddEditAuthorComponent,{  width:"450px",data:{status:"add",data:{}}});
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.get_category_list()
    });
  }

  ngOnInit(): void {
    // this.get_category_list()
  }
  get_category_list(){
    this._http.get(environment.author_all_list).subscribe((res:any) => {
      this.toastr.success(res.message)
      this.data = res.data.result;
    })
  }


}
