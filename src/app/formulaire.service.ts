import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormulaireService {

  constructor(private httpClient : HttpClient ) { }

  public login(username : string, password : string) :   Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders ({'Content-Type':'application/json'})
    };

    return this.httpClient.post<any> (environment.login, {
      "username": username,
      "password": password
    }, httpOptions);
  }

  public inscription(username: string, password: string): Observable<any>{
    return this.httpClient.post<any>(environment.register,{
      username: username,
      password: password
    },{
      observe: 'response',
      responseType: 'blob' as 'json'
    });
  }
}