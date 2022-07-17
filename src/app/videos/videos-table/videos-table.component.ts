import { AfterViewInit, Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CategoryService } from 'src/app/_http/api/services/category-service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2/dist/sweetalert2.js'; 
import { MatDialog } from '@angular/material/dialog';
import {VideosAddEditComponent} from '../videos-add-edit/videos-add-edit.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-videos-table',
  templateUrl: './videos-table.component.html',
  styleUrls: ['./videos-table.component.scss']
})
export class VideosTableComponent implements OnInit {

  spinner = {}
  @Input() data1:any;  
  displayedColumns: any = ['multidelete','position','author','profile', 'name', 'weight', 'symbol','edit','delete'];
  dataSource!:MatTableDataSource<any>
   
  @ViewChild('paginators') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  multiDelete:any =[]
  length: any;
  pageSize = 5;
  pageIndex = 1;
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;

  constructor(private _http:HttpClient,private toastr: ToastrService,public dialog: MatDialog,private spinnerNGX: NgxSpinnerService) {

   }

  ngOnInit(): void {
    this.get_category_list(this.pageIndex,this.pageSize)
 
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   this.dataSource = new MatTableDataSource(this.data1);
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
   
	// }

  onTableDataChange(event: any):any {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex+1;
    this.get_category_list(this.pageIndex,this.pageSize)
  }
  get_category_list(page?:any,limit?:any){
    this.spinnerNGX.show()
    this._http.get(environment.video_list+`?page=${page}&limit=${limit}`).subscribe((res:any) => {
      this.length = res.data.total;
      this.spinnerNGX.hide()
      this.dataSource = new MatTableDataSource(res.data.result);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },(err:any)=>{
      this.spinnerNGX.hide()
    })
  }

  openDialog(item:any) {
    const dialogRef = this.dialog.open(VideosAddEditComponent,{  width:"450px",data:{status:"Update",data:item}});
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`,result);
     var objIndex = this.dataSource.filteredData.findIndex((obj => obj._id == result._id));
      this.dataSource.filteredData[objIndex].title = result.title
      this.dataSource.filteredData[objIndex].slug = result.slug
      this.dataSource.filteredData[objIndex].authorId = result.authorId
      this.dataSource.filteredData[objIndex].url = result.url
      this.dataSource.filteredData[objIndex].date = result.date
      this.dataSource.filteredData[objIndex].status = result.status
     
    });
  }

 
  deleletCategory(id:any){
    this.spinner[id] = true;
    Swal.fire({  
      title: 'Are you sure want to Delete?',  
      // text: 'You will not be able to recover this file!',  
      icon: 'warning',  
      showCancelButton: true,  
      confirmButtonText: 'Yes, delete it!',  
      cancelButtonText: 'No, keep it'  
    }).then((result) => {  
      if (result.value) {  
         this._http.delete(environment.videoDeleteOne+'/'+id).subscribe((res:any)=>{
          this.spinner[id] = false;
      this.toastr.success(res.message);
      this.data1 = this.data1.filter(function(item) {
        return item .id!== id
    })

    // this.dataSource =  this.data1
     
     var dataSource_data =  this.dataSource.filteredData.filter((value:any)=>{
        return value._id != id;
      },(err:any)=>{
        this.toastr.error(err.statusText)
      });
      this.dataSource = new MatTableDataSource(dataSource_data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
      } else if (result.dismiss === Swal.DismissReason.cancel) {  
        this.spinner[id] = false;
      }  
    })
   
  }
  MultideleletCategory(){
    // this.spinner[id] = true;
    Swal.fire({  
      title: 'Are you sure want to Delete?',  
      // text: 'You will not be able to recover this file!',  
      icon: 'warning',  
      showCancelButton: true,  
      confirmButtonText: 'Yes, delete it!',  
      cancelButtonText: 'No, keep it'  
    }).then((result) => {  
      if (result.value) {  
         this._http.post(environment.videoDeleteMany,this.multiDelete).subscribe((res:any)=>{
          // this.spinner[id] = false;
      this.toastr.success(res.message);
       this.multiDelete.map((item:any)=>{
        var dataSource_data =  this.dataSource.filteredData.filter((value:any)=>{
          return value._id != item;
        },(err:any)=>{
          this.toastr.error(err.statusText)
        });
        this.dataSource = new MatTableDataSource(dataSource_data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
       })
       this.multiDelete = []
    })
      } else if (result.dismiss === Swal.DismissReason.cancel) {  
        // this.spinner[id] = false;
      }  
    })
   
  }
  toggle(id:string,event:any) {
    let index = this.multiDelete.findIndex(rank => rank === id);
    if(-1==index){
      this.multiDelete.push(id)
    }
    else{
      this.multiDelete.splice(index, 1);
    }
  }

 
}
