import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

import { IonicModule, IonicRouteStrategy, NavParams } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CalcPage } from './calc/calc.page';
import { LoadPage } from './load/load.page';
import { SearchPage } from './modal/search/search.page';
import { IonicStorageModule } from '@ionic/storage-angular';
import { HttpClientModule } from '@angular/common/http';
import { HomePage } from './home/home.page';
import { ProductPage } from './modal/product/product.page';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, CalcPage, LoadPage, SearchPage, HomePage, ProductPage],
  imports: [BrowserModule, 
    FormsModule,
    IonicModule.forRoot(), 
    AppRoutingModule, 
    IonicStorageModule.forRoot({name: '__parexdb'}), 
    HttpClientModule],
  providers: [NavParams, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
