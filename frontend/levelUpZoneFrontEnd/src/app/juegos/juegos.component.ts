import { Component, OnInit } from '@angular/core';
import { Juego } from '../juegos';
import { JuegosService } from '../juegos.service';
import { CommonModule } from '@angular/common';
import { InventarioService } from '../inventario.service';

@Component({
    selector: 'app-juegos',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './juegos.component.html',
    styleUrl: './juegos.component.scss'
})
export class JuegosComponent {

}
