import { AfterViewInit, Component, Input, OnInit, SimpleChanges , ViewChild} from '@angular/core';
import { CategoryService } from 'src/app/_http/api/services/category-service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2/dist/sweetalert2.js'; 
import { addEditCategoryComponent } from '../add-edit-category';
import { MatDialog } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-table-category',
  templateUrl: './table-category.component.html',
  styleUrls: ['./table-category.component.scss']
})
export class TableCategoryComponent implements OnInit{
  spinner = {}
  @Input() data1:any;  
  displayedColumns: any = ['all','position', 'name', 'weight', 'symbol','edit','delete'];
  // dataSource:any;
  displayedColumns1: string[] = ['select', 'position', 'name', 'weight', 'symbol'];
  // dataSource :any
  dataSource!:MatTableDataSource<any>;
  // selection = new SelectionModel<any>(true, []);
  multiDelete:any =[]
  temp={}
  
  @ViewChild('paginators') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _http:HttpClient,private toastr: ToastrService,public dialog: MatDialog) {
  
   }

  
 
  ngOnInit(): void {

 
  }
  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }

  ngOnChanges(changes: SimpleChanges) {
 
    this.dataSource = new MatTableDataSource(this.data1);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log(this.dataSource,"?>?>?");
    
    // this.dataSource =  new MatTableDataSource<any>(this.data1);
   
	}

  openDialog(item:any) {
    const dialogRef = this.dialog.open(addEditCategoryComponent,{  width:"450px",data:{status:"Update",data:item}});
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`,result);
    //  var objIndex = this.dataSource.findIndex((obj => obj._id == result._id));
    //   this.dataSource[objIndex].title = result.title
    //   this.dataSource[objIndex].slug = result.slug
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
         this._http.delete(environment.category_delete+'/'+id).subscribe((res:any)=>{
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
         this._http.post(environment.category_delete_many,this.multiDelete).subscribe((res:any)=>{
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
