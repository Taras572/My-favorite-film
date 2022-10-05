import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListFilmsComponent } from './pages/list-films/list-films.component';
import { FavoriteFilmsComponent } from './pages/favorite-films/favorite-films.component';


const routes: Routes = [
  { path: '', component: ListFilmsComponent },
  { path: 'List-films', component: ListFilmsComponent },
  { path: 'Favorite-films', component: FavoriteFilmsComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
