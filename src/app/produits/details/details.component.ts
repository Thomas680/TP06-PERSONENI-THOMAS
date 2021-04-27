import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { ApiService } from '../../api.service';
import { Observable } from 'rxjs';
import { Produit } from 'src/shared/models/produit';
import { AjouterProduit } from 'src/shared/actions/ajouter-produit.action';

@Component({
  selector: 'app-detail',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  produitDetails$ : Observable<Produit>;
  produitDetails : {id: number, titre?: string, description?: string, prix?:number};

  constructor(private route:ActivatedRoute, private store:Store, private apiService : ApiService) { }

  id : number;

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.produitDetails$ = this.apiService.getProductDetail(this.id);
    this.produitDetails$.subscribe(item => this.produitDetails = item );

  }

  addToBasket(id : number, name : string, price : number) {
    this.store.dispatch(new AjouterProduit({"id":id,"titre":name,"prix": price}));
  }
}