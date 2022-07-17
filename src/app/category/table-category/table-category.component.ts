import { AfterViewInit, Component, Input, OnInit, SimpleChanges , ViewChild} from '@angular/core';
import { CategoryService } from '../category-service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2/dist/sweetalert2.js'; 
import { addEditCategoryComponent } from '../add-edit-category';
import { MatDialog } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { tap } from 'rxjs/operators';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-table-category',
  templateUrl: './table-category.component.html',
  styleUrls: ['./table-category.component.scss']
})
export class TableCategoryComponent implements OnInit{
  spinner = {}
  tableSize:any =10
  currentPage:any
  pageEvent: PageEvent;
  datasource: null;
  @Input() data1:any;  
   @Input() page:any
  displayedColumns: any = ['all','position', 'name','forFront', 'weight', 'symbol','edit','delete'];
  // dataSource:any;
  displayedColumns1: string[] = ['select', 'position', 'name', 'weight', 'symbol'];
  // dataSource :any
  dataSource!:MatTableDataSource<any>;
  // selection = new SelectionModel<any>(true, []);
  multiDelete:any =[]
  temp={}
  length:any;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;
  @ViewChild('paginators') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _http:HttpClient,private toastr: ToastrService,public dialog: MatDialog,private __categoryService:CategoryService,private spinnerNGX: NgxSpinnerService) {
    // this.dataSource.paginator = this.paginator;
    // console.log(this.paginator, "dfg");
    // if (typeof (this.paginator) != 'undefined' && typeof (this.paginator.page) !== 'undefined') {
    //   this.paginator.page.pipe(tap(() => {
    //     this.load()
    //   })).subscribe()
    // }
    console.log(this.paginator,"dataSource");
    this.__categoryService.$lotalItem.subscribe((data)=>{
      this.length = data
    })
   }

 

  ngAfterViewChecked(): void {
    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class.
    // var test:any = this.paginator
    // var index = test +1;
    // this.__categoryService.$paginatorObj.next({page:index})
    // this.__categoryService.$page.next(index)
  }
 
  ngOnInit(): void {
   
    this.get_category_list(this.pageIndex,this.pageSize)

  }
  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.paginator.pageIndex + 1, "--page index", this.paginator.pageSize);
    this.dataSource = new MatTableDataSource(this.data1);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    
    console.log("p");
    
    // this.dataSource =  new MatTableDataSource<any>(this.data1);
   
	}

  openDialog(item:any) {
    const dialogRef = this.dialog.open(addEditCategoryComponent,{  width:"450px",data:{status:"Update",data:item}});
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`,result);
     var objIndex = this.dataSource.filteredData.findIndex((obj => obj._id == result._id));
      this.dataSource.filteredData[objIndex].title = result.title
      this.dataSource.filteredData[objIndex].slug = result.slug
      this.dataSource.filteredData[objIndex].status = result.status
      this.dataSource.filteredData[objIndex].forFront = result.forFront
      //forFront
      
    });
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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



  onTableDataChange(event: any):any {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex+1;
    this.get_category_list(this.pageIndex,this.pageSize)
  }

  get_category_list(page?:any,limit?:any){
    this.spinnerNGX.show();
    this._http.get(environment.category_all_list+`?page=${page}&limit=${limit}`).subscribe((res:any) => {
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
 
}
