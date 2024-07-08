import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { NavController, NavParams } from '@ionic/angular';
import { HomePage } from '../home/home.page';

@Component({
  selector: 'app-histo',
  templateUrl: './histo.page.html',
  styleUrls: ['./histo.page.scss'],
})
export class HistoPage implements OnInit {
	resultList: any;
	loaded: boolean;
	choice:any;
	homePage: any;

  constructor(public user: UserService, public navCtrl: NavController, public navParams: NavParams) {
		this.loaded = false;
		this.choice = "";
		this.homePage = HomePage;
   }

  ngOnInit() {
  }

	ionViewWillEnter() {
		console.log(this.user.getUserData());
		this.resultList = this.user.getUserData().resultList || [];
		this.loaded = true;
	}

	deleteResult(idx: number){
		this.user.deleteResult(idx);
	}
  
	public returnToHome(){
		this.navCtrl.navigateRoot('home');
	  }
}
