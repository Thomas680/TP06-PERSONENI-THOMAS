import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { ApiHttpInterceptor } from './api-http-interceptor';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private store: Store, private router:Router, private apiHttpInterceptor:ApiHttpInterceptor){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return !!this.apiHttpInterceptor.jwtToken;
    //   if(localStorage.getItem('token') === null){
    //     this.router.navigate(['/connexion']);
    //     return false;
    //   }
    // return true;
  }
  
}