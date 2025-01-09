import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { MiInventarioComponent } from './mi-inventario/mi-inventario.component';
import { JuegosComponent } from './juegos/juegos.component';
import { ContactoComponent } from './contacto/contacto.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
  // { path: '', redirectTo: '/inicio', pathMatch: 'full' }, Tipo de enrutamiento pathmath: 'full' redirige a la ruta especificada en el path
  {path: 'inicio', component: InicioComponent},
  {path: 'mi-inventario', component: MiInventarioComponent},
  {path: 'juegos', component: JuegosComponent},
  {path: 'contacto', component: ContactoComponent},
  {path: '**', component: PageNotFoundComponent},
];
