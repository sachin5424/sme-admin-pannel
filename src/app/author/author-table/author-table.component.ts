import { AfterViewInit, Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CategoryService } from 'src/app/_http/api/services/category-service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2/dist/sweetalert2.js'; 
import { MatDialog } from '@angular/material/dialog';
import { AddEditAuthorComponent } from '../add-edit-sub-author/add-edit-author.component';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-author-table',
  templateUrl: './author-table.component.html',
  styleUrls: ['./author-table.component.scss']
})
export class AuthorTableComponent implements OnInit {
  spinner = {}
  multiDelete = []
  @Input() data1:any;  
  displayedColumns: any = ['multidelete','position','profile', 'name', 'weight', 'symbol','edit','delete'];
  dataSource!:MatTableDataSource<any>
   
  @ViewChild('paginators') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private _http:HttpClient,private toastr: ToastrService,public dialog: MatDialog) {

   }

  ngOnInit(): void {

 
  }
  ngOnChanges(changes: SimpleChanges) {
    this.dataSource = new MatTableDataSource(this.data1);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
   
	}

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
 
}
