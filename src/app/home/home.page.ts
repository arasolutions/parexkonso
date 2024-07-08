import { Component, OnInit } from '@angular/core';
import { CalcPage } from '../calc/calc.page';
import { UserService } from '../user.service';
import { NavController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  calcPage: any;
  loaded: boolean;
  restData: any;
  favoriteList: any;

  constructor(public user: UserService, public navCtrl: NavController, public router: Router) {
    this.calcPage = CalcPage;
    this.loaded = false; 
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.restData = this.user.getDatabase();
    this.favoriteList = this.user.getUserData().favoriteList || [];
    setTimeout(() => {
      this.loaded = true;
    }, 150);

  }

  public goToCalcDomain(idxDomain: any) {
    console.log("goToCalcDomain > "+idxDomain);
    this.user.setCurrentDomainFromId(idxDomain);
    this.navCtrl.navigateRoot('calc');
  }
  
  public goToCalcProduct(product: any) {
    console.log("goToCalcDomain > "+product.id);
    this.user.setCurrentDomainFromId(product.domainId);
    this.user.setCurrentProduct(product);
		this.navCtrl.navigateRoot('calc');
  }

  public returnToHome(){
    this.navCtrl.navigateRoot('home');
  }
}
