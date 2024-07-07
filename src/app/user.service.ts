import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

const DBNAME = "userData";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  	private userData: any;
	private currentDomain: any;
	private currentProduct: any;

  constructor(public storage: Storage, public alertCtrl: AlertController) {
		this.init();
    storage.get(DBNAME).then((val: any) => {
			this.userData = val || {};
			if (this.userData.favoriteList) {
				//this.events.publish('menu:updateProducts', this.userData.favoriteList);
			}
		});
	}

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
	console.log('UserService > init');
    await this.storage.create();
  }

  getDatabase() {
		return this.userData.database;
	}
	setDatabase(data: any) {
		this.userData.database = {};
		this.userData.database = data;
		this.saveUserData();
	}
  
	saveUserData() {
		this.storage.set(DBNAME, this.userData);
	}
  
  getCurrentDomain() {
		return this.currentDomain;
	}

  setCurrentDomainByIdx(idxDomain: any) {
		this.setCurrentDomain(this.getDatabase().domains[idxDomain]);
		this.currentProduct = null;
		
	}

  setCurrentDomain(domain: any) {
		this.currentDomain = domain;
		this.currentProduct = null;
	}

  setCurrentDomainFromId(id: any) {
    console.log("UserService setCurrentDomainFromId > " + id);
	console.log(this.userData.database.domains);
		
	if (this.userData.database.domains[id] !== undefined) {
		this.setCurrentDomain(this.userData.database.domains[id]);
		this.currentProduct = null;
	}
}

getCurrentProduct() {
	return this.currentProduct;
}

setCurrentProduct(product: any) {
	console.log('UserService > setCurrentProduct');
	this.currentProduct = product;
    this.currentProduct.label = this.currentProduct.code + ' ' + this.currentProduct.name;
	console.log(this.currentProduct);
}

  isFavorite(product: any) {
		if (this.userData.favoriteList) {
			for (let i = 0; i < this.userData.favoriteList.length; i++) {
				if (product.id === this.userData.favoriteList[i].id) {
					return true;
				}
			}
		}
		return false;
	}
  
	getUserData() {
		return this.userData;
	}

	openProduct(product :any) {
		//A l'ouverture d'une fiche technique, on vérifie si elle est présente en local et si téléchargée depuis moins de 1 mois je l'affiche, sinon je vais la chercher sur le serveur et je la télécharge en local
		//J'associe id du produit à la fiche technique et la date courante (je sauvegarde que les 5 dernieres fiches de manière glissante)
		if (!this.userData.localFt || this.userData.localFt.length === 0) {
			this.userData.localFt = [];
		}
		var localProd: any;
		localProd = {};
		localProd.founded = false;
		/*const fileTransfer: FileTransferObject = this.transfer.create();
		for (let i = 0; i < this.userData.localFt.length; i++) {
			if (this.userData.localFt[i].id === product.id) {
				localProd = this.userData.localFt[i];
				localProd.founded = true;
				break;
			}
		}
		// si trouvé et - de 30j (2592000s)
		if (localProd.founded && (Math.round(Date.now() / 1000) - localProd.entryDate) < 2592000) {
			//on affiche
			this.fileOpener.open(localProd.entry, 'application/pdf')
				.then(() => console.log('File is opened'))
				.catch(e => console.log('Error openening file', e));
		} else {
			//on télécharge
			fileTransfer.download(product.ft, this.file.dataDirectory + 'fiche_' + product.id + '.pdf').then((entry) => {
				product.entry = entry.toURL();
				product.entryDate = Math.round(Date.now() / 1000);
				this.userData.localFt.unshift(product);
				this.userData.localFt = this.userData.localFt.slice(0, 7);
				this.saveUserData();
				this.fileOpener.open(product.entry, 'application/pdf')
					.then(() => console.log('File is opened'))
					.catch(e => console.log('Error openening file', e));
			}, (error) => {
				// si erreur (pas de réseau?) on essaye quand meme d'afficher (meme si > 30j)
				this.fileOpener.open(localProd.entry, 'application/pdf')
					.then(() => console.log('File is opened'))
					.catch(e => console.log('Error openening file', e));
			});

		}*/
	}

	addToFavorite(product: any) {
		if (!this.userData.favoriteList || this.userData.favoriteList.length === 0) {
			this.userData.favoriteList = [];
		}
		this.userData.favoriteList.unshift(product);
		this.saveUserData();
		//this.events.publish('menu:updateProducts', this.userData.favoriteList);
	}

	removeFromFavorite(product: any) {
		for (let i = 0; i < this.userData.favoriteList.length; i++) {
			if (product.id === this.userData.favoriteList[i].id) {
				this.userData.favoriteList.splice(i, 1);
				break;
			}
		}
		this.saveUserData();
		//this.events.publish('menu:updateProducts', this.userData.favoriteList);
	}


	getCondList() {
		console.log(this.userData.database.conditionnements);
		return this.userData.database.conditionnements;
	}

	saveResult(data: any) {
		if (!this.userData.resultList) {
			this.userData.resultList = [];
		}
		this.userData.resultList.unshift(data);
		this.saveUserData();
	}

}
