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
  juegos: Juego[] = [];
  isPopupVisible: boolean = false;
  selectedJuego: Juego | null = null;
  constructor(private juegosService: JuegosService, private inventarioService: InventarioService) {}

  ngOnInit(): void {
    this.juegosService.getJuegos().subscribe(juegos => {
      this.juegos = juegos;
    });
  }

  openPopup(juego: Juego): void {
    this.selectedJuego = juego;
    this.isPopupVisible = true;
  }

  closePopup(): void {
    this.isPopupVisible = false;
    this.selectedJuego = null;
  }
}
