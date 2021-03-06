import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogueComponent } from './produits/catalogue/catalogue.component';
import { PanierComponent } from './panier/panier.component';
import { DetailsComponent } from './produits/details/details.component';
import { LoginComponent } from './login/login.component';
import { AccueilComponent } from './accueil/accueil.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path:"login", component:LoginComponent, pathMatch:"full"},
  {path:"register", component:InscriptionComponent, pathMatch:"full"},
  {path:"catalogue", component:CatalogueComponent, pathMatch:"full", canActivate:[AuthGuard]},
  {path:"panier", component:PanierComponent, pathMatch:"full", canActivate:[AuthGuard]},
  {path:"details/:id", component:DetailsComponent, pathMatch:"full" ,canActivate:[AuthGuard]},
  {path:"", component:AccueilComponent, pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }