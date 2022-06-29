import { Component, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  token:Boolean = false;
  public htmlData: string = ""
  public readonly: boolean = true;
  constructor(private _router:Router,) {
    // setInterval(() => {
    //   console.log("", this.htmlData)
    // }, 2000)
  }

  // ngOnChanges(changes: SimpleChanges) {
 
   
	// }

  ngOnInit(): void {
      if(sessionStorage.getItem("token")){
      this.token = true;
    }
     
      //  window.location.reload();

  }
  checkLogin(event:any){
    console.log(event,"event");
    this.token = event;
    // if(event==true){
    //   this._router.navigate(['/category'])
    // }
    
  }
  checkLogout(event:any){
    console.log(event,"logout");
    this.token = event;
    
  }

}
