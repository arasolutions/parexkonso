import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoPageRoutingModule } from './histo-routing.module';

import { HistoPage } from './histo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoPageRoutingModule
  ],
  declarations: [HistoPage]
})
export class HistoPageModule {}
