import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { AddEditCommentComponent } from '../add-edit-comment/add-edit-comment.component';

@Component({
  selector: 'app-comment-dashboard',
  templateUrl: './comment-dashboard.component.html',
  styleUrls: ['./comment-dashboard.component.scss']
})
export class CommentDashboardComponent implements OnInit {

  data = []
  constructor(public dialog: MatDialog, private _http:HttpClient,private toastr: ToastrService) {
  
  }


  openDialog() {
    const dialogRef = this.dialog.open(AddEditCommentComponent,{  width:"450px",data:{status:"add",data:{}}});
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.get_category_list()
    });
  }

  ngOnInit(): void {
    this.get_category_list()
  }
  get_category_list(){
    this._http.get(environment.comment_list).subscribe((res:any) => {
      this.toastr.success(res.message)
      this.data = res.data.result;
    })
  }

}
