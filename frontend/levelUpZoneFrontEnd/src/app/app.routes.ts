import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CollectionComponent } from './collection/collection.component';
import { GamesComponent } from './games/games.component';
import { ContactComponent } from './contact/contact.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CardsComponent } from './cards/cards.component';
import { AsdComponent } from './asd/asd.component';

export const routes: Routes = [
  {path: '', redirectTo: '/inicio', pathMatch: 'full', title: 'Inicio'},
  {path: 'cards', component: CardsComponent, title: 'Inicio'},
  {path: 'asd', component: AsdComponent, title: 'Asd'},
  {path: 'inicio', component: HomeComponent, title: 'Inicio'},
  {path: 'mi-inventario', component: CollectionComponent, title: 'Mi Inventario'},
  {path: 'Games', component: GamesComponent, title: 'Games'},
  {path: 'contacto', component: ContactComponent, title: 'Contacto'},
  {path: '**', component: PageNotFoundComponent, title: 'Page Not Found'},
];
