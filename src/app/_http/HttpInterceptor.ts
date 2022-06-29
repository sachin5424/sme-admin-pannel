import { HttpInterceptor, HttpClient, HttpRequest, HttpHandler, HttpHeaders } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { environment } from "src/environments/environment"

@Injectable({
    providedIn: 'root'
  })

export class TextAuthInterceptor implements HttpInterceptor {
    status: any
    constructor(private _http: HttpClient) {
        this.status = sessionStorage.getItem('loginError')
    }
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        var Bearer = "Bearer "
        var token =  sessionStorage.getItem('token');
        var auth = Bearer + token
        const user = new HttpHeaders({
            'Authorization': `${auth}`,
        })
           console.log(user,":>>>>>>>");
        const header = req.clone({ headers: user })
        return next.handle(header)
  
    }
  
  }