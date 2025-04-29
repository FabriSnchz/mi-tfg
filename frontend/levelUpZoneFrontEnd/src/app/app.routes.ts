import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { MiInventarioComponent } from './mi-inventario/mi-inventario.component';
import { JuegosComponent } from './juegos/juegos.component';
import { ContactoComponent } from './contacto/contacto.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CardsComponent } from './cards/cards.component';
import { AsdComponent } from './asd/asd.component';

export const routes: Routes = [
  {path: '', redirectTo: '/inicio', pathMatch: 'full', title: 'Inicio'},
  {path: 'cards', component: CardsComponent, title: 'Inicio'},
  {path: 'asd', component: AsdComponent, title: 'Asd'},
  {path: 'inicio', component: InicioComponent, title: 'Inicio'},
  {path: 'mi-inventario', component: MiInventarioComponent, title: 'Mi Inventario'},
  {path: 'juegos', component: JuegosComponent, title: 'Juegos'},
  {path: 'contacto', component: ContactoComponent, title: 'Contacto'},
  {path: '**', component: PageNotFoundComponent, title: 'Page Not Found'},
];
