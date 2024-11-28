import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  searchQuery: string = '';
  products: any;

  constructor(public user: UserService, public modalCtrl: ModalController ) {
  }

  ionViewWillEnter(){
    console.log('SearchPage > ionViewWillEnter');
    this.initializeItems();
  }

  initializeItems() {
    console.log('SearchPage > initializeItems');
    this.products = this.user.getCurrentDomain().products;
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    console.log("getItems > ");
    console.log(ev);
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.products = this.products.filter((product:any) => {
        return ((product.code.toLowerCase() + ' ' + product.name.toLowerCase()).indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  ngOnInit() {
  }

	selectProduct(p: any) {
		this.modalCtrl.dismiss(p);
	}

}
