import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-edit-magazine',
  templateUrl: './add-edit-magazine.component.html',
  styleUrls: ['./add-edit-magazine.component.scss']
})
export class AddEditMagazineComponent implements OnInit {


  spinner = false
  Form:any
  errorObj:any ={
  
  }
  types:string[] =  ["header", "top", "horizontal", "right", "aricleFooter"];
  openIn:string[] = ["sameTab", "newTab"];
  months:any = [
    {
      title:"January",value:1,
    },
    {
      title:"February",value:2,
    },
    {
      title:"March",value:3,
    },
    {title:"April",value:4},
    {
      title:"May",value:5,
    },
    {
      title:"June",value:6,
    },
    {
      title:"July",value:7,
    },
    {
      title:"August",value:8
    },
    {
      title:"September",value:9
    },
    {
      title:"October",value:10
    },
    {
      title:"November",value:11
    },
    {
      title:"December",value:12
    }
  ]
  autherList: any;
  imageError: string;
  base64Image: any;
  cardImageBase64: any;
  isImageSaved: boolean;
  previewImagePath: any;
  file: File;
   constructor(private _http:HttpClient,private toastr: ToastrService,
       public dialogRef: MatDialogRef<any>,
       @Inject(MAT_DIALOG_DATA) public data: any,
       ) { 

       this.addForm()
   }

   ngOnInit() {
    this.get_author_list()

    }

   addForm(){
       var update = this.data.data;
       if(update){
        this.base64Image = update.image
       }
       this.Form = new FormGroup({
           status: new FormControl(update.status?update.status:false),
          //  title: new FormControl(update.title?update.title:'',[Validators.required, Validators.minLength(2)]),
          //  slug : new FormControl(update.title?update.title:'',[Validators.required, Validators.minLength(2)]),
          year : new FormControl(update.year?update.year:'',[Validators.required,]),
           month:new FormControl(update.month?update.month:'',[Validators.required,]),
           fileId: new FormControl(update.fileId?update.fileId:'', [Validators.required])
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
                    this.previewImagePath = imgBase64Path;
                    console.log(this.previewImagePath);
                    
                }
            };
        };
      const formData = new FormData();
      formData.append('fileId',fileInput.target.files[0].name);
      this._http.post(environment.fileSave,formData).subscribe((res)=>{
        console.log({res});
        
      },(err)=>{
        console.log({err});
        
      })


  
        reader.readAsDataURL(fileInput.target.files[0]);
    }

}

    getFile(event:any) {
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.Form.patchValue({
          fileId: file
        });
        const formData = new FormData();
        formData.append('file', this.Form.get('fileId').value);
        this._http.post(environment.fileSave, formData)
        .subscribe((res:any )=> {
          console.log(res);
          this.Form.patchValue({
            fileId: res.data.fileId
          });
          this.base64Image = environment.api_url +res.data.name
        })
    }
}
   submit(formDirective:any){
//   formDirective.resetForm()
       this.spinner = true;
       if(this.Form.valid){
           if(this.data.status =="Update"){
               this.Form.addControl('_id',new FormControl(this.data.data._id))
           }
        
        this._http.post(environment.magazineSave,this.Form.value).subscribe((res:any)=>{
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

   get_author_list(){
    this._http.get(environment.author_all_list).subscribe((res:any) => {
        console.log(res,"?>?");
        
      this.toastr.success(res.message)
      this.autherList = res.data.result;
      console.log(this.autherList);
      
    })
}
  }