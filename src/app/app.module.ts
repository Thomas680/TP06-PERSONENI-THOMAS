import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CatalogueComponent } from './produits/catalogue/catalogue.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FiltreComponent } from './filtre/filtre.component';
import { FormsModule } from '@angular/forms';
import { PanierComponent } from './panier/panier.component';
import { PanierState } from './state/panier.state';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { DetailsComponent } from './produits/details/details.component';
import { ApiHttpInterceptor } from './api-http-interceptor';
import { LoginComponent } from './login/login.component';
import { AccueilComponent } from './accueil/accueil.component';
import { InscriptionComponent } from './inscription/inscription.component';


@NgModule({
  declarations: [
    AppComponent,
    CatalogueComponent,
    FiltreComponent,
    PanierComponent,
    HeaderComponent,
    DetailsComponent,
    LoginComponent,
    AccueilComponent,
    InscriptionComponent
  ],
  imports: [
    BrowserModule, 
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    NgxsModule.forRoot([PanierState], {
      developmentMode:!environment.production
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiHttpInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
