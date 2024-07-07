import { Component, OnInit } from '@angular/core';
import { CalcPage } from '../calc/calc.page';
import { UserService } from '../user.service';
import { NavController } from '@ionic/angular';

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

  constructor(public user: UserService, public navCtrl: NavController) {
    this.calcPage = CalcPage;
    this.loaded = false; 
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    console.log('cc2');
    this.restData = this.user.getDatabase();
    this.favoriteList = this.user.getUserData().favoriteList || [];
    setTimeout(() => {
      this.loaded = true;
    }, 150);

  }

  public goToCalcDomain(idxDomain: any) {
    console.log("goToCalcDomain > "+idxDomain);
    this.user.setCurrentDomainFromId(idxDomain);
    this.navCtrl.navigateForward('calc');
  }
  
  public goToCalcProduct(product: any) {
    this.navCtrl.navigateForward('');
  }

}
