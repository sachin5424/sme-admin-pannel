import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { APIRoutesService } from '../api-routes.services';


@Injectable({providedIn: 'root'})
export class CategoryService {
    categoryList$ = new Subject();
    // constructor(private _http: MasterService,private _apiRoutes:APIRoutesService) { }
    
    // getList(){
    //    return this._http.get("category/list/ALL");
    // }
}