import { Component, inject, OnInit } from '@angular/core';
import { NavController, ModalController, AlertController, NavParams } from '@ionic/angular';
import { UserService } from '../user.service';
import { SearchPage } from '../modal/search/search.page';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductPage } from '../modal/product/product.page';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.page.html',
  styleUrls: ['./calc.page.scss'],
})
export class CalcPage implements OnInit {
  form: any;
  homePage: any;
  domain: any;
  currentProduct: any;
  currentDomain: any;
  saved: boolean;
  private activatedRoute = inject(ActivatedRoute);
  buttonBottom: string;

  constructor(public alertCtrl: AlertController, public user: UserService, public navParams: NavParams, public navCtrl: NavController, public modalCtrl: ModalController, public router:Router) {
    this.form = {};
    this.form.showResult = false;
    this.buttonBottom = 'CALCULER';

    this.currentProduct = {};
    this.currentDomain = {};
    this.saved = false;
  }

  ngOnInit() {
    console.log("CalcPage ngOnInit > ");
	this.currentDomain = this.user.getCurrentDomain();
	if(this.user.getCurrentProduct!=null){
		// On vient des favoris
		console.log('On vient des favoris');
		this.currentProduct = this.user.getCurrentProduct();
        this.initProduct(this.currentProduct);
        this.initForm(this.currentProduct);
	}
  }

  async openSearchModal() {
    let searchModal = await this.modalCtrl.create({ 
      component: SearchPage
    });

    searchModal.onDidDismiss().then((product:any) => {
      console.log(product);
      if (product) {
		this.user.setCurrentProduct(product.data);
        this.initProduct(product.data);
        this.initForm(product.data);
      }
    });
    
    return searchModal.present();
  }

  async openModal() {
    const productModal = await this.modalCtrl.create({ 
      component: ProductPage, 
      componentProps:{
        product: this.currentProduct
      } 
    });
    return productModal.present();
  }
  
  ionViewDidEnter() {
	console.log("CalcPage > ionViewDidEnter");
    if (this.user.getCurrentDomain() === undefined) {
		this.goToHome();
    }
	this.currentDomain = this.user.getCurrentDomain();
  }

  initForm(p:any) {
    this.currentDomain = this.user.getCurrentDomain();
    this.form = JSON.parse(JSON.stringify(this.user.getCurrentDomain()));
	console.log(p);
    if (p) {
      this.form.fav = this.user.isFavorite(p);
      //alimentation des plages
      for (let i = 0; i < this.form.materials.length; i++) {
        for (let j = 0; j < this.form.materials[i].parameters.length; j++) {
          var param = this.form.materials[i].parameters[j];
          if (param.type === 'plage') {
			console.log(param.id);
			console.log(p.plage);
            if (p.plage && p.plage[param.id + '']) {
              param.values = p.plage[param.id + ''];
              param.type = 'list';
            } else {
              console.log('Pas de plage définie');
            }
          }
        }
      }
	  console.log(this.form);
    }
  }

  public goToHome() {
    this.navCtrl.navigateForward('home');
  }

  initProduct(product: any) {
    console.log('CalcPage > initProduct');
    this.buttonBottom = 'CALCULER';
    this.currentProduct=this.user.getCurrentProduct();
  }

  calculResult(domainId: any) {
	console.log("CalcPage > calculResult");
		if (!this.form.showResult) {
			console.log(this.form);
			console.log(this.form.data);
			this.form.saved = false;
			this.form.data = [];
			let tmp: any;
			for (let i = 0; i < this.form.materials.length; i++) {
				for (let j = 0; j < this.form.materials[i].parameters.length; j++) {
					tmp = {};
					//this.form.datathis.form.nameList.push(this.form.materials[i].parameters[j].name=this.form.nameList.push(this.form.materials[i].parameters[j].choice;
					tmp.unit = this.form.materials[i].parameters[j].unit;
					tmp.label = this.form.materials[i].parameters[j].label;
					tmp.pattern = this.form.materials[i].parameters[j].pattern;
					if (this.form.materials[i].parameters[j].choice !== 'Autre') {
						if ((this.form.materials[i].parameters[j].name).toLowerCase() === 'dimensions') {
							if (!this.form.materials[i].parameters[j].choice) {
								this.form.materials[i].parameters[j].choice = "0x0";
							}
							let Ll = this.form.materials[i].parameters[j].choice.split('x');
							tmp.unit = this.form.materials[i].parameters[j].otherParameters[0].unit;
							tmp.name = this.form.materials[i].parameters[j].otherParameters[0].name;
							tmp.value = parseFloat(Ll[0]);
							tmp.label = this.form.materials[i].name + ' ' + this.form.materials[i].parameters[j].otherParameters[0].label;
							tmp.pattern = this.form.materials[i].parameters[j].otherParameters[0].pattern;
							this.form.data.push(tmp);
							tmp = {};
							tmp.unit = this.form.materials[i].parameters[j].otherParameters[1].unit;
							tmp.name = this.form.materials[i].parameters[j].otherParameters[1].name;
							tmp.value = parseFloat(Ll[1]);
							tmp.label = this.form.materials[i].name + ' ' + this.form.materials[i].parameters[j].otherParameters[1].label;
							tmp.pattern = this.form.materials[i].parameters[j].otherParameters[1].pattern;
							this.form.data.push(tmp);
						}
						else {
							tmp.name = this.form.materials[i].parameters[j].name;
							tmp.value = parseFloat(this.form.materials[i].parameters[j].choice)
							this.form.data.push(tmp);
						}
					}
					else if (this.form.materials[i].parameters[j].choice === 'Autre' && this.form.materials[i].parameters[j].otherParameters) {
						if ((this.form.materials[i].parameters[j].name).toLowerCase() === 'dimensions') {
							tmp.name = this.form.materials[i].parameters[j].otherParameters[0].name;
							tmp.value = this.form.materials[i].parameters[j].otherParameters[0].choice;
							tmp.label = this.form.materials[i].name + ' ' + this.form.materials[i].parameters[j].otherParameters[0].label;
							tmp.unit = this.form.materials[i].parameters[j].otherParameters[0].unit;
							tmp.pattern = this.form.materials[i].parameters[j].otherParameters[0].pattern;
							this.form.data.push(tmp);
							tmp = {};
							tmp.name = this.form.materials[i].parameters[j].otherParameters[1].name;
							tmp.value = this.form.materials[i].parameters[j].otherParameters[1].choice;
							tmp.label = this.form.materials[i].name + ' ' + this.form.materials[i].parameters[j].otherParameters[1].label;
							tmp.unit = this.form.materials[i].parameters[j].otherParameters[1].unit;
							tmp.pattern = this.form.materials[i].parameters[j].otherParameters[1].pattern;
							this.form.data.push(tmp);
						} else {
							tmp.name = this.form.materials[i].parameters[j].name;
							tmp.value = parseFloat(this.form.materials[i].parameters[j].otherParameters[0].choice);
							this.form.data.push(tmp);
						}
					}
				}
			}

			/*Gestion erreur*/
			let errors = '';
			for (let i = 0; i < this.form.data.length; i++) {
				let input = this.form.data[i];
				if (!input.value) {
					errors += (input.label + ', ');
				}
			}
			if(errors != ''){
				this.presentAlert(errors.substring(0, errors.length-2));
				return;
			}

			this.form.showResult = !this.form.showResult;
			this.buttonBottom = 'RETOUR';
			this.form.calc = JSON.parse(JSON.stringify(this.currentDomain.calculations));

			let condList = this.user.getCondList();

			for (let k = 0; k < this.form.calc.length; k++) {
				for (let i = 0; i < this.form.calc[k].formulas.length; i++) {
					//this.form.calc[k].formulas[i].calcul = this.form.calc[k].formulas[i].calcul;
					for (let j = 0; j < this.form.data.length; j++) {
						this.form.calc[k].formulas[i].calcul = this.form.calc[k].formulas[i].calcul.replace(new RegExp(this.form.data[j].name, 'g'), this.form.data[j].value);
					}
					if (!this.currentProduct.densite) {
						this.currentProduct.densite = 1;
					}
					this.form.calc[k].formulas[i].calcul = this.form.calc[k].formulas[i].calcul.replace(new RegExp('densite', 'g'), this.currentProduct.densite);
					let condList0;
					for (let c = 0; c < condList.length; c++) {
						if (condList[c].id === this.currentProduct.cond[0]) {
							condList0 = condList[c];
							break;
						}
					}
					this.form.calc[k].formulas[i].calcul = this.form.calc[k].formulas[i].calcul.replace(new RegExp('conditionnement', 'g'), condList0.value);
					this.form.calc[k].formulas[i].result = Math.round(eval(this.form.calc[k].formulas[i].calcul) * 100) / 100;
				}
			}
			this.form.calc[0].cond = [];
			//A voir comment gérer ca
			let kg = this.form.calc[0].formulas[0].result;
			let nextItem;

			// Calcul pour achats recommandés
			console.log(this.user.getCondList());
			for (let i = 0; i < this.currentProduct.cond.length; i++) {
				let idCond = this.currentProduct.cond[i];
				for (let c = 0; c < condList.length; c++) {
					if (condList[c].id === idCond) {
						tmp = {'id':condList[c].id, 'icon':condList[c].icon, 'label':condList[c].label, 'value':condList[c].value};
						break;
					}
				}
				if (i !== this.currentProduct.cond.length - 1) {
					let idNext = this.currentProduct.cond[i + 1];
					for (let c = 0; c < condList.length; c++) {
						if (condList[c].id === idNext) {
							nextItem = condList[c];
							break;
						}
					}
					tmp.nb = Math.floor((kg + nextItem.value) / tmp.value);
					console.log(tmp.nb);
					kg = kg - (tmp.nb * tmp.value);
				} else {
					tmp.nb = Math.ceil(kg / tmp.value);
				}
				this.form.calc[0].cond.push(tmp);
				if (kg <= 0) {
					break;
				}
			}
			
			// Calcul par conditionnement
			this.form.calc[0].byCond = [];
			let tmpByCond;
			kg = this.form.calc[0].formulas[0].result;
			for (let i = 0; i < this.currentProduct.cond.length; i++) {
				let idCond = this.currentProduct.cond[i];
				for (let c = 0; c < condList.length; c++) {
					if (condList[c].id === idCond) {
						tmpByCond = {'id':condList[c].id, 'icon':condList[c].icon, 'label':condList[c].label, 'value':condList[c].value, nb:0};
						tmpByCond.nb = Math.ceil(kg / tmpByCond.value);
						this.form.calc[0].byCond.push(tmpByCond);
						break;
					}
				}
			}

		} else {
			this.form.showResult = !this.form.showResult;
			console.log(this.form.data);
			this.buttonBottom = 'CALCULER';
		}
	}

	async presentAlert(message: string) {
		const alert = await this.alertCtrl.create({
		  header: 'Champ erroné',
		  message: 'Merci de renseigner correctement : ' + message,
		  buttons: ['OK']
		});
		await alert.present();
	  }

	saveResult() {
		this.saved = true;
		let save: any;
		save = {};
		save.product = this.currentProduct; 
		save.product.color = this.user.getCurrentDomain().color;
		save.product.domainId = this.user.getCurrentDomain().id;
		save.form = JSON.parse(JSON.stringify(this.form));;
		this.user.saveResult(save);
		console.log(this.user.getUserData());
	}
  
	removeFromFavorite(p: any) {
		this.user.removeFromFavorite(p);
	}


  addToFavorite(p: any) {
		//On injecte au produit la couleur du domaine
		p.color = this.user.getCurrentDomain().color;
		//On injecte au produit son domaine
		p.domainId = this.user.getCurrentDomain().id;
		this.user.addToFavorite(p);
	}

	public returnToHome(){
		this.navCtrl.navigateRoot('home');
	  }
}