import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-edit-author',
  templateUrl: './add-edit-author.component.html',
  styleUrls: ['./add-edit-author.component.scss']
})
export class AddEditAuthorComponent implements OnInit {

  spinner = false
  Form:any
  imageError: string;
  base64Image: any;
  cardImageBase64: any;
  isImageSaved: boolean;
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
       if(update){
        this.base64Image = update.profileImg
       }
       this.Form = new FormGroup({
           status: new FormControl(update.status?update.status:false),
           name: new FormControl(update.name?update.name:'',[Validators.required, Validators.minLength(2)]),
           email : new FormControl(update.email?update.email:'',[Validators.required, Validators.email]),
          
       })
   }

   onFileSelected(fileInput:any){
    this.imageError = null;
    // console.log(fileInput.target.files.FileList);
    
    if (fileInput.target.files && fileInput.target.files[0]) {
        // Size Filter Bytes
        const max_size = 20971520;
        const allowed_types = ['image/png', 'image/jpeg'];
        const max_height = 15200;
        const max_width = 25600;

        if (fileInput.target.files[0].size > max_size) {
            this.imageError =
                'Maximum size allowed is ' + max_size / 1000 + 'Mb';

            return false;
        }

    
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const image = new Image();
            console.log(image);
            
            image.src = e.target.result;
            image.onload = rs => {
                const img_height = rs.currentTarget['height'];
                const img_width = rs.currentTarget['width'];

                console.log(img_height, img_width);


                if (img_height > max_height && img_width > max_width) {
                    this.imageError =
                        'Maximum dimentions allowed ' +
                        max_height +
                        '*' +
                        max_width +
                        'px';
                    return false;
                } else {
                    const imgBase64Path = e.target.result;
                    this.base64Image = imgBase64Path
                    console.log(imgBase64Path);
                    
                    this.cardImageBase64 = imgBase64Path;
                    
                    this.isImageSaved = true;
                    // this.previewImagePath = imgBase64Path;
                }
            };
        };

  
        reader.readAsDataURL(fileInput.target.files[0]);
    }

}
   submit(formDirective:any){
//   formDirective.resetForm()
       this.spinner = true;
       if(this.Form.valid){
           if(this.data.status =="Update"){
               this.Form.addControl('_id',new FormControl(this.data.data._id))
           }
        //    this.Form.addControl('profileImg', new FormControl())
        this.Form.value['profileImg'] =this.base64Image
           // profileImg:new FormControl("6298a8f569a9c12a6bfc4a09")
        this._http.post(environment.save_author_list,this.Form.value).subscribe((res:any)=>{
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
            console.log(e,"k");
            this.toastr.error(e.msg)
            
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