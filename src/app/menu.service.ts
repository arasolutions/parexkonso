import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  domains = Array();
  products = Array();

  constructor() {
   }

  async updateDomains(data: any) {
    console.log('MenuService > updateDomains');
    this.domains = data.domains;
    console.log(this.domains);
  }
  
  getDomains() {
    return this.domains;
  }

  getProducts() {
    return this.products;
  }
}
