import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contact-us-add-edit',
  templateUrl: './contact-us-add-edit.component.html',
  styleUrls: ['./contact-us-add-edit.component.scss']
})
export class ContactUsAddEditComponent implements OnInit {
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
            name: new FormControl(update.name?update.name:'',[Validators.required, Validators.minLength(2)]),
            email : new FormControl(update.email?update.email:'',[Validators.required, Validators.email]),
            subject: new FormControl(update.subject?update.subject:'',[Validators.required, Validators.minLength(2)]),
            message: new FormControl(update.message?update.message:'',[Validators.required, Validators.minLength(2)]),
            
            //message
        })
    }
    submit(formDirective:any){
//   formDirective.resetForm()
        this.spinner = true;
        if(this.Form.valid){
            if(this.data.status =="Update"){
                this.Form.addControl('_id',new FormControl(this.data.data._id))
            }
         this._http.post(environment.contactUsSave,this.Form.value).subscribe((res:any)=>{
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