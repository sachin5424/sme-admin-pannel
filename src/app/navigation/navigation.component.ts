import { Component , Output, EventEmitter} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import Swal from 'sweetalert2/dist/sweetalert2.js'; 
import { Router } from '@angular/router';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  @Output() logout = new EventEmitter<boolean>();
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  routes:any[] =[
    { 
      title:'category',
      route: 'category'
    },
    { 
      title:"Author",
      route:"author"
    },
    { 
      title:"News",
      route:"news"
    },
    {
      title:"comment",route:"comment"
    },
    {title:"ads",route:"test-ads"},
    {
      title:"video",route:"video"
    },
    {title:"magazine",route:"magazine"},
    {title:"Contact Us",route:"contact-us"}
  ]
  constructor(private breakpointObserver: BreakpointObserver,private _router:Router) {}


  logOut(){
    Swal.fire({  
      title: 'Do you want Logout',  
      showDenyButton: false,  showCancelButton: true,  
      confirmButtonText: `Logout`,  
      denyButtonText: `Don't save`,
    }).then((result) => {  
      /* Read more about isConfirmed, isDenied below */  
        if (result.isConfirmed) {  
          window.sessionStorage.clear()  
          this.logout.emit(true);
          window.location.reload();
          Swal.fire('logout!', '', 'success')  
        } else if (result.isDenied) {  
          this.logout.emit(false);  
          // Swal.fire('Changes are not saved', '', 'info')  
       }
    });
  }
}
