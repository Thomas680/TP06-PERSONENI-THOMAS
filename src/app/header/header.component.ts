import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { PanierState } from '../state/panier.state';
import { Produit } from 'src/shared/models/produit';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  products$: Observable<Produit[]>;
  productsLength:number;
  totalPrice:number;
  constructor(private store:Store) { 
  }

  ngOnInit(): void {
    this.products$ = this.store.select(PanierState.getProducts);
    this.products$.subscribe((item) => {
      this.productsLength = item.length;
      this.totalPrice = item.reduce((a, b) => a+b.prix,0);
    });
  }

}