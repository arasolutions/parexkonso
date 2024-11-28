import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AlertController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { RestService } from '../rest.service';
import { MenuService } from '../menu.service';
import { SplashScreen } from '@capacitor/splash-screen';
import localData from '../../assets/json/data.json';


@Component({
  selector: 'app-load',
  templateUrl: './load.page.html',
  styleUrls: ['./load.page.scss'],
})
export class LoadPage implements OnInit {

  restData: string[];
  errorMessage: string;
  subscription: any;
  app_version: any;
  app_version_remote: any;
  localData:any;

  constructor(public user: UserService, public alertCtrl:AlertController, public navCtrl: NavController, public storage: Storage, public rest: RestService, public menuService: MenuService) {
    this.app_version = 2.1;
    this.restData = [];
    this.errorMessage = '';
    this.localData = localData;
  }

  async ngOnInit() {
    await SplashScreen.show({
      showDuration: 2000,
      autoHide: true,
    });
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Mise à jour',
      message: 'Une nouvelle version de l\'application est disponible. Pensez à la mettre à jour sur votre store.',
      buttons: ['OK']
    });
    await alert.present();
  }


  ionViewWillEnter() {
    console.log('LoadPage --> ionViewWillEnter');
    this.rest.getRemoteVersion()
      .subscribe({
        next: (data) => {
          let d = JSON.parse(JSON.stringify(data));
          this.app_version_remote = d.app_version || 0;
          if (this.app_version < this.app_version_remote) {
            this.presentAlert();
          }
        },
        error: (err)=> {
          //alert(err.message);
        },
        complete: ()=>{
          //alert("Get Version Fait");

        }
  });


    this.subscription = this.rest.getRemoteData()
      .subscribe({
        next: (data:any) => {
          this.restData=data;
          this.setDatas();
          this.goToHome();
      },
      error: (err)=> {
        //chargement données locale
    console.log('subscription localData');
        this.restData=this.localData;
        this.setDatas();
        this.goToHome();
      },
      complete: () => {

      }}
      );
  }

setDatas(){
  //Gestion des dim
  let lar = { "name": "largeur", "label": "Largeur", "type": "number", "placeholder": "Largeur du carreau (cm)", "unit": "cm", "choice": "" };
  let lon = { "name": "longueur", "label": "Longueur", "type": "number", "placeholder": "Longueur du carreau (cm)", "unit": "cm", "choice": "" };

  let p = JSON.parse(JSON.stringify(this.restData));
  for (let i = 0; i < p.domains.length; i++) {
    for (let j = 0; j < p.domains[i].materials.length; j++) {
      for (let k = 0; k < p.domains[i].materials[j].parameters.length; k++) {
        if (p.domains[i].materials[j].parameters[k].otherParameters) {
          if (p.domains[i].materials[j].parameters[k].otherParameters[0].type === 'dim') {
            p.domains[i].materials[j].parameters[k].otherParameters[0] = lon;
            p.domains[i].materials[j].parameters[k].otherParameters[1] = lar;
            p.domains[i].materials[j].parameters[k].otherParameters[0].name = (p.domains[i].materials[j].name + '_' + p.domains[i].materials[j].parameters[k].otherParameters[0].name).toLowerCase();
            p.domains[i].materials[j].parameters[k].otherParameters[1].name = (p.domains[i].materials[j].name + '_' + p.domains[i].materials[j].parameters[k].otherParameters[1].name).toLowerCase();
          } else {
            p.domains[i].materials[j].parameters[k].otherParameters[0].name = (p.domains[i].materials[j].name + '_' + p.domains[i].materials[j].parameters[k].otherParameters[0].name).toLowerCase();
          }
        }
        if ((p.domains[i].materials[j].parameters[k].name).toLowerCase() !== "dimensions") {
          p.domains[i].materials[j].parameters[k].name = (p.domains[i].materials[j].name + '_' + p.domains[i].materials[j].parameters[k].name).toLowerCase();
        }
      }
    }
  }
  this.user.setDatabase(p);
  console.log(p);
  this.menuService.updateDomains(p);
}

  goToHome() {
    //1s histoire ques les providers soient bien chargés
    setTimeout(() => {
      this.navCtrl.navigateRoot('/home');
    }, 1000);
  }

  cancelButton() {
    this.subscription.unsubscribe();
    //this.user.setDatabaseLocal();
    this.goToHome();
  }

}
