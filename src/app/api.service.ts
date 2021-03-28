import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient : HttpClient)
  {

  }

  public getProducts () : Observable<any> {
    return this.httpClient.get<any> (environment.baseUrl);
  }

  public getProductsDetails () : Observable<any> {
    return this.httpClient.get<any> (environment.detailsUrl);
  }


}
