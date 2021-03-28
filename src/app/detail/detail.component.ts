import { Component, OnInit } from '@angular/core';
import { AjouterProduit } from '../actions/ajouter-produit.action';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  id:number;
  productDetails:{id:number, name:string, price:number, description:string}
  constructor(private route:ActivatedRoute, private store:Store) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get("id"));
    this.productDetails = this.details.find(item => item.id === this.id)
  }

  onProductClicked()
  {
    this.store.dispatch(new AjouterProduit(this.productDetails));
  }


  details = [
    {
      "id": 1,
      "name": "présavatif king size",
      "description": "la description du produit",
      "price": 2
    },
    {
      "id": 2,
      "name": "paquet de 4 kitkat",
      "description": "la description du produit",
      "price": 4
    },
    {
      "id": 3,
      "name": "serviette hygénique",
      "description": "la description du produit",
      "price": 2
    },
    {
      "id": 4,
  
      "name": "biele de moteur",
      "description": "la description du produit",
      "price": 200
    },
    {
      "id": 5,
      "name": "papier peint à poids vert",
      "description": "la description du produit",
      "price": 40
    },
    {
      "id": 6,
      "name": "collier pour chien",
      "description": "la description du produit",
      "price": 10
    },
    {
      "id": 7,
      "name": "une seule béquille",
      "description": "la description du produit",
      "price": 20
    },
    {
      "id": 8,
      "name": "cuitochette",
      "description": "la description du produit",
      "price": 4
    }
  ]
}