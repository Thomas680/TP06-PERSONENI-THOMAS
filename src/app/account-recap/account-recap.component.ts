import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-recap',
  templateUrl: './account-recap.component.html',
  styleUrls: ['./account-recap.component.css']
})
export class AccountRecapComponent implements OnInit {

  civilite : string = "";
  firstname : string = "";
  name : string = "";
  address : string = "";
  postalCode : string = "";
  city : string = "";
  country : string = "";
  phone : number = null;
  email : string = "";
  login : string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
