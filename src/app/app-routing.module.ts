import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { PanierComponent } from './panier/panier.component';
import { DetailComponent } from './detail/detail.component';
import { AccountFormComponent } from './account-form/account-form.component';

const routes: Routes = [
  {path:"register", component:AccountFormComponent, pathMatch:"full"},
  {path:"panier", component:PanierComponent, pathMatch:"full"},
  {path:"details/:id", component:DetailComponent, pathMatch:"full"},
  {path:"", component:CatalogueComponent, pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }