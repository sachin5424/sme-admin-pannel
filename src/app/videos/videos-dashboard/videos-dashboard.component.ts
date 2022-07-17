import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import {VideosAddEditComponent} from '../videos-add-edit/videos-add-edit.component';

@Component({
  selector: 'app-videos-dashboard',
  templateUrl: './videos-dashboard.component.html',
  styleUrls: ['./videos-dashboard.component.scss']
})
export class VideosDashboardComponent implements OnInit {
  data = []
  constructor(public dialog: MatDialog, private _http:HttpClient,private toastr: ToastrService) {
  
  }


  openDialog() {
    const dialogRef = this.dialog.open(VideosAddEditComponent,{  width:"450px",data:{status:"add",data:{}}});
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.get_category_list()
    });
  }

  ngOnInit(): void {
    // this.get_category_list()
  }
  get_category_list(){
    this._http.get(environment.video_list).subscribe((res:any) => {
      this.toastr.success(res.message)
      this.data = res.data.result;
    })
  }


}