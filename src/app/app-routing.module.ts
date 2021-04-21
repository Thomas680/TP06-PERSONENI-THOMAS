import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogueComponent } from './produits/catalogue/catalogue.component';
import { PanierComponent } from './panier/panier.component';
import { DetailsComponent } from './produits/details/details.component';
import { AccountFormComponent } from './account-form/account-form.component';
import { LoginComponent } from './login/login.component';
import { AccueilComponent } from './accueil/accueil.component';

const routes: Routes = [
  {path:"login", component:LoginComponent, pathMatch:"full"},
  {path:"register", component:AccountFormComponent, pathMatch:"full"},
  {path:"catalogue", component:CatalogueComponent, pathMatch:"full"},
  {path:"panier", component:PanierComponent, pathMatch:"full"},
  {path:"details/:id", component:DetailsComponent, pathMatch:"full"},
  {path:"", component:AccueilComponent, pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }