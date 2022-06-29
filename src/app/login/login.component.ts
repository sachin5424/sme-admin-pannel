import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit , Output, EventEmitter} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  spinner = false
   Form:any
   @Output() login = new EventEmitter<Boolean>();
   errorObj:any ={
   
   }
    constructor(private _http:HttpClient,private toastr: ToastrService,
      
        ) { 

        this.addForm()
    }

    ngOnInit() {

     }

    addForm(){
        this.Form = new FormGroup({
            userName: new FormControl('',[Validators.required,]),
            password : new FormControl('',[Validators.required]),
        })
    }
    submit(formDirective:any){
//   formDirective.resetForm()

        this.spinner = true;
        if(this.Form.valid){
         this._http.post(environment.adminLogin,this.Form.value).subscribe((res:any)=>{
            this.toastr.success(res.message)
            console.log(res);
            if(res.data.accessToken){
              sessionStorage.setItem('token',res.data.accessToken);
              this.login.emit(true);
            }
            
            this.spinner = false;
         },(err)=>{
          this.login.emit(false);
            this.spinner = false
            this.toastr.error(err.error.message)
         })
        }
        else{
            this.spinner = false
            this.toastr.error(this.Form.status)
           console.log(this.Form.status);
           
        }


    };

}