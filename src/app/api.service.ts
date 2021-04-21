import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from "rxjs";
import { Produit } from 'src/shared/models/produit';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient : HttpClient)
  {

  }

  public getProducts() : Observable<any> {
    return this.httpClient.get<any> (environment.getProduits);
  }

  public getProductDetail(id: number): Observable<Produit>{
    return this.httpClient.get<Produit>(environment.getProduitDetails.replace('{id}', id.toString()));
  }
}
