import { Component, OnInit } from '@angular/core';
import { FormulaireService } from '../formulaire.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username : string = "";
  password : string = "";

  constructor(private formulaireService : FormulaireService ) { }

  ngOnInit(): void {
  }

  doLogin() {
    console.log(this.username + " " + this.password);
    this.formulaireService.login(this.username, this.password).subscribe(data => console.log(data));
  }
}