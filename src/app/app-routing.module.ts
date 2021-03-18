import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { CardComponent } from './views/card/card.component';
import { CardsComponent } from './views/cards/cards.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: {animation: 'Home'} },
  { path: 'cards', component: CardsComponent},
  { path: 'cards/:q', component: CardsComponent},
  { path: 'card', redirectTo: 'home', pathMatch: 'full' },
  { path: 'card/:id', component: CardComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
