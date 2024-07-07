import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {


  product: any;
  constructor(private params: NavParams, public user: UserService, public modalController: ModalController) {
    this.initializeProduct(params.get('product'));
  }

  ngOnInit() {
  }

  initializeProduct(product: any) {
    this.product = product;
  }

  openLink(product: any) {
    //A l'ouverture d'une fiche technique, on vérifie si elle est présente en local et si téléchargée depuis moins de 1 mois je l'affiche, sinon je vais la chercher sur le serveur et je la télécharge en local
    //J'associe id du produit à la fiche technique et la date courante (je sauvegarde que les 5 dernieres fiches de manière glissante)
    this.user.openProduct(product);
  }
  
	closeModal() {
		this.modalController.dismiss();
	}
}
