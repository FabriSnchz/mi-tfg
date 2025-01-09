import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { InicioComponent } from './inicio/inicio.component';
import { MiInventarioComponent } from './mi-inventario/mi-inventario.component';
import { JuegosComponent } from './juegos/juegos.component';
import { ContactoComponent } from './contacto/contacto.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, InicioComponent, MiInventarioComponent, JuegosComponent, ContactoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'level-up-zone';
}
