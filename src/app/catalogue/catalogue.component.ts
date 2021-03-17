import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import {Observable,of,from} from 'rxjs';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {
  constructor(private apiService : ApiService)  { }

  observable$ : Observable<any> = null;

  ngOnInit(): void {

  }

  onClickGetProducts () {
    this.observable$ = this.apiService.getProducts ();
  }
}
