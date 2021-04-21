import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { AjouterProduit } from '../../actions/ajouter-produit.action';
import { Produit } from '../../model/produit.model';
import { Observable } from 'rxjs';
import { PanierState } from '../../state/panier.state';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {
  @Input() products:Array<any> = [];
  products$: Observable<Produit[]>;
  constructor(private apiService : ApiService, private store:Store)  { }

  observable$ : Observable<any> = null;

  ngOnInit(): void {

  }

  getProducts () {
    this.observable$ = this.apiService.getProducts();
    this.products$ = this.store.select(PanierState.getProducts);
  }

  addToBasket(product:Produit)
  {
    this.store.dispatch(new AjouterProduit(product));
  }
}
