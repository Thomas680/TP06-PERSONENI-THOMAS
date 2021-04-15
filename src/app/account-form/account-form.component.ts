import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentFactory, ComponentRef } from '@angular/core';
import { AccountRecapComponent } from '../account-recap/account-recap.component';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.css']
})
export class AccountFormComponent implements OnInit {

  @ViewChild("recapContainer", { read: ViewContainerRef }) container;

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
  password : string = "";
  passwordConfirm : string = "";

  passwordValid : boolean = true;
  valid : boolean = false;
  submit : boolean = false;

  componentRef : ComponentRef<AccountRecapComponent>;

  constructor(private resolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
  }

  sendForm () {
    this.submit = true;
    console.log ("Validation du formulaire...");
    this.passwordValid = this.password == this.passwordConfirm;

    if(this.passwordValid) {
      this.valid = true;
    }

    if( 
        this.name.length == 0 ||
        this.address.length == 0 ||
        this.postalCode.toString().length == 0 ||
        this.city.length == 0 ||
        this.country.length == 0 ||
        this.phone.toString().length == 0 ||
        this.email.length == 0 ||
        this.login.length == 0
      ) {
      this.valid = false;
    }

    if(this.valid)
      this.createComponent(this.civilite, this.firstname, this.name, this.address, this.postalCode, this.city, this.country, this.phone, this.email, this.login);
  }

  createComponent(civilite, firstname, name, address, postalCode, city, country, phone, email, login) {
    const factory = this.resolver.resolveComponentFactory(AccountRecapComponent);
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.civilite = civilite;
    this.componentRef.instance.firstname = firstname;
    this.componentRef.instance.name = name;
    this.componentRef.instance.address = address;
    this.componentRef.instance.postalCode = postalCode;
    this.componentRef.instance.city = city;
    this.componentRef.instance.country = country;
    this.componentRef.instance.phone = phone;
    this.componentRef.instance.email = email;
    this.componentRef.instance.login = login;
  }
}
