import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { addEditCategoryComponent } from '../add-edit-category';
import { CategoryService } from '../category-service';

@Component({
  selector: 'app-category-dashboard',
  templateUrl: './category-dashboard.component.html',
  styleUrls: ['./category-dashboard.component.scss']
})
export class CategoryDashboardComponent implements OnInit {
  data:any = []
  test:any
  dataSourcePage:any;
  page: any = 1;
  pageSize:any
  tableSize:any =10
  constructor(public dialog: MatDialog, private _http:HttpClient,private toastr: ToastrService,private _categoryService:CategoryService) {
  
  }



  openDialog() {
    
    const dialogRef = this.dialog.open(addEditCategoryComponent,{  width:"450px",data:{status:"add",data:{}}});
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.get_category_list()
    });
  }

  ngOnInit(): void {
    // this.get_category_list()
   
    // this.addItem()
    console.log(this.test);
    
  }
  get_category_list(page?:any,limit?:any){
    
    this._http.get(environment.category_all_list+`?page=${this.page}&limit=${50}`).subscribe((res:any) => {
      this.toastr.success(res.message)
      this.data = res.data.result;
      this._categoryService.$lotalItem.next(res.data.total)
    })
  }


  addItem(e:any){
    console.log({e},":?:");
    this.test = e
    
  }
  onTableDataChange(event: any) {
    this.page = event;
    // this.fetchPosts();
    console.log(event)
  }

}
