import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormulaireService } from '../formulaire.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  username : string = "";
  password : string = "";
  confirmPassword : string = "";

  constructor(private formulaireService : FormulaireService, private router: Router) { }

  ngOnInit(): void {
  }

  doInscription(){
    if(this.password == this.confirmPassword){
      this.formulaireService.inscription(this.username, this.password).subscribe(response => {
        if(response.status == 200){
          this.router.navigate(['/']);
        }
      })
    }
  }
}
