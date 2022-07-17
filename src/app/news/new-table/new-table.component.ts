import { AfterViewInit, Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CategoryService } from 'src/app/_http/api/services/category-service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2/dist/sweetalert2.js'; 
import { MatDialog } from '@angular/material/dialog';
import {  NewAddEditComponent} from '../new-add-edit/new-add-edit.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-new-table',
  templateUrl: './new-table.component.html',
  styleUrls: ['./new-table.component.scss']
})
export class NewTableComponent implements OnInit {

  spinner = {}
  @Input() data1:any;  
  displayedColumns: any = ['multidelete','position','slug','profile', 'name', 'weight', 'symbol','edit','delete'];
  dataSource!:MatTableDataSource<any>
   
  @ViewChild('paginators') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  length:any;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;
  quary :any
  multiDelete:any =[]
  constructor(private _http:HttpClient,private toastr: ToastrService,public dialog: MatDialog,private spinnerNGX: NgxSpinnerService) {
    
   }

  ngOnInit(): void {
    this.get_category_list(this.pageIndex,this.pageSize)
 
  }

  onTableDataChange(event: any):any {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex+1;
    this.get_category_list(this.pageIndex,this.pageSize)
  }

  get_category_list(page?:any,limit?:any){
    this.spinnerNGX.show();
    this._http.get(environment.news_list+`?page=${page}&limit=${limit}`).subscribe((res:any) => {
      // this.toastr.success(res.message)
      this.spinnerNGX.hide();
      this.length = res.data.total
      this.dataSource = new MatTableDataSource(res.data.result);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },(err:any)=>{
      this.spinnerNGX.hide();
    })
  }
  // ngOnChanges(changes: SimpleChanges) {
  //   this.dataSource = new MatTableDataSource(this.data1);
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
   
	// }

  openDialog(item:any) {
    console.log({item});
    
    const dialogRef = this.dialog.open(NewAddEditComponent,{  width:"650px",data:{status:"Update",data:item}});
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`,result);
     var objIndex = this.dataSource.filteredData.findIndex((obj => obj._id == result._id));
      this.dataSource.filteredData[objIndex].title = result.title
      this.dataSource.filteredData[objIndex].slug = result.slug
      this.dataSource.filteredData[objIndex].status = result.status
      this.dataSource.filteredData[objIndex].image = result.image
      this.dataSource.filteredData[objIndex].thumbNail = result.thumbNail
      this.dataSource.filteredData[objIndex].date = result.date
      this.dataSource.filteredData[objIndex].categoryId = result.categoryId
      this.dataSource.filteredData[objIndex].favoriteSeason = result.favoriteSeason
      this.dataSource.filteredData[objIndex].authorId = result.authorId
      // this.dataSource.filteredData[objIndex].categoryId = result.categoryId
      
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
         this._http.delete(environment.news_delete+'/'+id).subscribe((res:any)=>{
      
      this.toastr.success(res.message);
      var deleteOne = this.dataSource.filteredData.filter((value:any)=>{
        return value._id != id;

      },(err:any)=>{
        this.toastr.error(err.statusText)
      });
      this.dataSource = new MatTableDataSource(deleteOne);
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
         this._http.post(environment.author_multi_delete,this.multiDelete).subscribe((res:any)=>{
          // this.spinner[id] = false;
      this.toastr.success(res.message);
      // this.multiDelete.map((item)=>{
      //   this.dataSource = this.dataSource.filter((value:any)=>{
      //     return value._id != item;
      //   })
      // })
     
     
      // ,(err:any)=>{
      //   this.toastr.error(err.statusText)
      // });
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
