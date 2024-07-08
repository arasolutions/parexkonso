import { Component, ViewChild } from '@angular/core';
import { UserService } from './user.service';
import { RestService } from './rest.service';
import { Platform, NavController, isPlatform, MenuController } from '@ionic/angular';
import { LoadPage } from './load/load.page';
import { CalcPage } from './calc/calc.page';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar } from '@capacitor/status-bar';
import { Keyboard } from '@capacitor/keyboard';

import { Storage } from '@ionic/storage-angular';
import { Capacitor, Plugins } from '@capacitor/core';
import { MenuService } from './menu.service';
import { HistoPage } from './histo/histo.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  rootPage: any = LoadPage;

  //pages: Array<{ title: string, component: any, color: string, icon: string }>;
  domains: any;
  products: any;
  private _storage: Storage | null = null;
  constructor(public user: UserService, public rest: RestService, public platform: Platform, private storage: Storage, public menuService: MenuService, public navCtrl: NavController, public menuCtrl: MenuController) {
    this.initializeApp();

    let params = new URLSearchParams(window.location.search);
    let version = params.get('?version');
    rest.setVersion(version);
  }

  async initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //StatusBar.styleDefault();
      //Obligé de hide ici pour ios
      if (this.isPlatformMobile()) {
      SplashScreen.hide();
        Keyboard.setAccessoryBarVisible({
        isVisible:false
      })
    }
    });
  }

  isPlatformMobile = (): boolean => (isPlatform('capacitor'));

  openPage(page:any) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    //this.nav.setRoot(page.component);
    this.navCtrl.navigateRoot(page.component);
  }
  goToCalcDomain(idxDomain: any) {
    console.log("goToCalcDomain > "+idxDomain);
    this.user.setCurrentDomainFromId(idxDomain);
    this.navCtrl.navigateForward('calc');
    this.menuCtrl.toggle();
  }
  goToCalcProduct(product: any) {
    this.navCtrl.navigateRoot('calc');
  }
  goToHisto() {
    this.navCtrl.navigateForward('histo');
    this.menuCtrl.toggle();
  }


}
