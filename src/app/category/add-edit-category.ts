import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'add-edit-category',
    template: `
    <form [formGroup]="Form"  #formDirective="ngForm"  (ngSubmit)="submit(formDirective)">
    <div class="container-fluid">

        <div class="row">
        
            <div class="col-md-12">
            <h1 class="text-center">{{ data.status }} Category </h1>
            <mat-form-field class="example-form-field w-100" appearance="outline">
                <mat-label>Title</mat-label>
                <input matInput type="text" formControlName="title">
                <mat-hint class="text-red" style="color:red" *ngIf="!Form.controls['title'].valid && 
                 Form.controls['title']?.touched"> 
                 This field is required    (Minimum 2 characters required)
                 {{ errorObj['title'] }}
                </mat-hint>
                <mat-hint class="text-red" style="color:red" > 
                 
                 {{ errorObj['title'] }}
                </mat-hint>
                </mat-form-field>
            </div>
            <div class="col-md-12">
            <mat-form-field class="example-form-field w-100" appearance="outline">
                <mat-label>Slug</mat-label>
                <input matInput type="text" formControlName="slug">
                <mat-hint class="text-red" style="color:red" *ngIf="!Form.controls['slug'].valid && 
                 Form.controls['slug']?.touched"> 
                 This field is required    (Minimum 2 characters required)
                </mat-hint>
                <mat-hint class="text-red" style="color:red" > 
                 {{ errorObj['slug'] }}
                </mat-hint>
                </mat-form-field>
            </div>
            <div class="col-md-12 mt-2">
            <mat-checkbox formControlName="status">Status</mat-checkbox>       
            </div>
           
            <div class="col-md-12 mt-2">
             <button type="submit" mat-raised-button color="spinner==true?null:primary'"   >
             <mat-spinner style="margin-left: 0px; margin:5px" diameter="25"   *ngIf="spinner" ></mat-spinner>
              {{ spinner == false? 'Save':null }}
            </button>    
            </div>
          
        </div>
    </div>
</form>
    `
})

export class addEditCategoryComponent implements OnInit {
    spinner = false
   Form:any
   errorObj:any ={
   
   }
    constructor(private _http:HttpClient,private toastr: ToastrService,
        public dialogRef: MatDialogRef<any>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        ) { 

        this.addForm()
    }

    ngOnInit() {

     }

    addForm(){
        var update = this.data.data;
        this.Form = new FormGroup({
            status: new FormControl(update.status?update.status:false),
            title: new FormControl(update.title?update.title:'',[Validators.required, Validators.minLength(2)]),
            slug : new FormControl(update.title?update.title:'',[Validators.required, Validators.minLength(2)]),
        })
    }
    submit(formDirective:any){
//   formDirective.resetForm()
        this.spinner = true;
        if(this.Form.valid){
            if(this.data.status =="Update"){
                this.Form.addControl('_id',new FormControl(this.data.data._id))
            }
         this._http.post(environment.category_save,this.Form.value).subscribe((res:any)=>{
            console.log(res);
            this.toastr.success(res.message)
            this.spinner = false;
            if(this.data.status =="Update"){
                this.dialogRef.close(this.Form.value) 
            }
            else{
                this.Form.reset();
                formDirective.resetForm()
            }
         },(err)=>{
            this.spinner = false
            this.toastr.error(err.statusText)
            console.log(err.error.errors,"err");
            if(err){
            err.error.errors.map((e:any)=>{
                 this.errorObj[e.param]=e.msg
            })
            console.log(this.errorObj);
            
            }
            
         })
        }
        else{
            this.spinner = false
        }


    };

}