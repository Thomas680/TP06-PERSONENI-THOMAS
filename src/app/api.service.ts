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
    this.datas = new Array<string> ();  
  }

  cpt : number = 0;
  datas : string [];
  log (data) {
    this.datas.push (data);
    this.cpt++;
    console.log (this.cpt + "" +this.datas );
  }
  
  public getProducts () : Observable<any> {
    return this.httpClient.get<any> (environment.baseUrl);
  }

}
