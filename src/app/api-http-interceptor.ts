import { Injectable } from  "@angular/core";
import { HttpInterceptor, HttpRequest,HttpHandler,HttpEvent ,HttpResponse, HttpErrorResponse } from  "@angular/common/http";
import { Observable,pipe} from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router} from '@angular/router'

@Injectable()
export class ApiHttpInterceptor implements HttpInterceptor
{
    constructor(private router : Router) { }
  
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (localStorage.getItem('jwt') != "") {
            req = req.clone({ setHeaders: { Authorization: `Bearer ${localStorage.getItem('jwt')}` }});
        }
        
        return next.handle(req).pipe(tap(
                (evt : HttpEvent<any>) => {
                    if (evt instanceof HttpResponse) {

                        let tab : Array<String> ;   
                        let enteteAuthorization = evt.headers.get("Authorization");
                        if (enteteAuthorization != null ) {
                            tab = enteteAuthorization.split(/Bearer\s+(.*)$/i);
                            if (tab.length > 1) {
                                localStorage.setItem("jwt", tab[1].toString());
                            }
                        }
                    }
                }, (error : HttpErrorResponse) => {
                    switch (error.status) {
                        case 401 :
                            this.router.navigate (['/login']);
                            break;
                        default : 
                            console.log ("Error http interceptor") 
                    }
                } 
        ))
    }   
}