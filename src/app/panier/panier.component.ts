import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { RetirerProduit } from '../../shared/actions/retirer-produit.action';
import { Observable } from 'rxjs';
import { PanierState } from '../../shared/states/panier.state';
import { Produit } from 'src/shared/models/produit';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {

  products$: Observable<Produit[]>;
  products:Produit[];
  constructor(private store:Store) { }

  ngOnInit(): void {
    this.products$ = this.store.select(PanierState.getProducts);
    this.products$.subscribe(item => this.products = item);
  }

  onProductRemoved(product:Produit)
  {
    this.store.dispatch(new RetirerProduit(product));
  }
}