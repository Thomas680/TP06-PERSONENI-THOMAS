import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details/details.component';
import { RouterModule, Routes } from '@angular/router';
import { CatalogueComponent } from './catalogue/catalogue.component';

const appRoutes : Routes = [
  {path:'catalogue',component:CatalogueComponent},
  {path: 'detail/:id', component: DetailsComponent },
]

@NgModule({
  declarations: [
   CatalogueComponent,
   DetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild (appRoutes)
  ]
})

export class ProduitsModule { }