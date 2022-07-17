import { AfterViewInit, Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CategoryService } from 'src/app/_http/api/services/category-service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2/dist/sweetalert2.js'; 
import { MatDialog } from '@angular/material/dialog';
import { AddEditAuthorComponent } from '../add-edit-sub-author/add-edit-author.component';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-author-table',
  templateUrl: './author-table.component.html',
  styleUrls: ['./author-table.component.scss']
})
export class AuthorTableComponent implements OnInit {
  spinner = {}
  multiDelete = []
  data1:any;  
  pageEvent: PageEvent;
  length:number;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;
  tempArray:any = []

  totalData:any
  displayedColumns: any = ['multidelete','position','profile', 'name', 'weight', 'symbol','edit','delete'];
  dataSource!:MatTableDataSource<any>
   
  @ViewChild('paginators') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  config: { itemsPerPage: number; currentPage: number; totalItems: any; };
  items: { id: number; name: string; }[];
  constructor(private _http:HttpClient,private toastr: ToastrService,public dialog: MatDialog,private spinnerNGX: NgxSpinnerService) {
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: length
    };
   }

  ngOnInit(): void {
this.get_category_list(this.pageIndex,this.pageSize)
this.items = Array(15).fill(0).map((x, i) => ({ id: (i + 1), name: `Item ${i + 1}`}));
  }
  // ngOnChanges(changes: SimpleChanges) {
  //   this.dataSource = new MatTableDataSource(this.data1);
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
   
	// }

  openDialog(item:any) {
    const dialogRef = this.dialog.open(AddEditAuthorComponent,{  width:"450px",data:{status:"Update",data:item}});
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`,result);
    //  var objIndex = this.dataSource.findIndex((obj => obj._id == result._id));
    //   this.dataSource[objIndex].name = result.name
    //   this.dataSource[objIndex].email = result.email
    //   this.dataSource[objIndex].status = result.status
      
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
         this._http.delete(environment.author_delete+'/'+id).subscribe((res:any)=>{
      
      this.toastr.success(res.message);
      // this.dataSource = this.dataSource.filter((value:any)=>{
      //   return value._id != id;
      // },(err:any)=>{
      //   this.toastr.error(err.statusText)
      // });
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
  get_category_list(page?:any,limit?:any){
    this.spinnerNGX.show()
    this._http.get(environment.author_all_list+`?page=${page||1}&limit=${limit||90}`).subscribe((res:any) => {

      this.spinnerNGX.hide()
      this.length = res.data.total;
      this.dataSource = new MatTableDataSource(res.data.result);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    
    },(err:any)=>{
      this.spinnerNGX.hide()
    })
  }
  onTableDataChange(event: any):any {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex+1;
    this.get_category_list(this.pageIndex,this.pageSize)
  }
}
