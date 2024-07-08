import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoadPage } from './load/load.page';
import { HomePage } from './home/home.page';
import { CalcPage } from './calc/calc.page';

const routes: Routes = [
  {
    path: '',
    component: LoadPage,
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomePage,
    pathMatch: 'full'
  },
  {
    path: 'calc',
    component: CalcPage,
    pathMatch: 'full'
  },
  {
    path: 'histo',
    loadChildren: () => import('./histo/histo.module').then( m => m.HistoPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
