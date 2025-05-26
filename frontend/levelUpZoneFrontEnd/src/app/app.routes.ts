import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CollectionComponent } from './collection/collection.component';
import { GamesComponent } from './games/games.component';
import { ContactComponent } from './contact/contact.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CardsComponent } from './cards/cards.component';
import { GameDetailComponent } from './game-detail/game-detail.component';
import { TemporaryCollectionComponent } from './temporary-collection/temporary-collection.component';
import { CollectionDetailComponent } from './collection-detail/collection-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full', title: 'Inicio' },
  // { path: '', component: AppComponent, pathMatch: 'full', canActivate: [authGuard] }, // Protege la ruta raíz
  // { path: '', component: AppComponent, pathMatch: 'full' }, // Protege la ruta raíz

  {path: 'cards', component: CardsComponent, title: 'Inicio'},
  {path: 'home', component: HomeComponent, title: 'Inicio'},
  {path: 'collections', component: CollectionComponent, title: 'Mi Inventario'},
  {path: 'collection/:id', component: CollectionDetailComponent, title: 'Detalles de las colecciones'},
  {path: 'temporary-collection', component: TemporaryCollectionComponent, title: 'Mi colección temporal'},
  {path: 'games', component: GamesComponent, title: 'Juegos'},
  {path: 'game-details/:id', component: GameDetailComponent, title: 'Detalles del Juego'},
  {path: 'contact', component: ContactComponent, title: 'Contacto'},
  {path: '**', component: PageNotFoundComponent, title: 'Page Not Found'},
];
