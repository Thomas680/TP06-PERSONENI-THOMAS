import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { HttpClientModule } from '@angular/common/http';
import { FiltreComponent } from './filtre/filtre.component';
import { FormsModule } from '@angular/forms';
import { PanierComponent } from './panier/panier.component';
import { PanierState } from './state/panier.state';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { DetailComponent } from './detail/detail.component';
import { AccountFormComponent } from './account-form/account-form.component';
import { AccountRecapComponent } from './account-recap/account-recap.component';


@NgModule({
  declarations: [
    AppComponent,
    CatalogueComponent,
    FiltreComponent,
    PanierComponent,
    HeaderComponent,
    DetailComponent,
    AccountFormComponent,
    AccountRecapComponent
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
