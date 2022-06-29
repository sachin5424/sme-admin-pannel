import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class APIRoutesService {
    category ={
        all_list:"category/list/ALL",
        save:"category/save",
        delete:(id:string) =>{
            return "category/delete/"+id
        }
    }
    category_all_list:"category/list/ALL"
    constructor() { }
    
}