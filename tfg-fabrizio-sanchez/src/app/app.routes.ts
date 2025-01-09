import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { MiInventarioComponent } from './mi-inventario/mi-inventario.component';
import { JuegosComponent } from './juegos/juegos.component';
import { ContactoComponent } from './contacto/contacto.component';

export const routes: Routes = [
  {path: 'inicio', component: InicioComponent},
  {path: 'mi-inventario', component: MiInventarioComponent},
  {path: 'juegos', component: JuegosComponent},
  {path: 'contacto', component: ContactoComponent},
];
