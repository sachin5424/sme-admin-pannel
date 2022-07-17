import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class CategoryService {
    $pageSize = new Subject();
    $lotalItem = new Subject();
    $page = new Subject();
    $limit = new Subject();
    $paginatorObj = new Subject();
    constructor() { }
    
}