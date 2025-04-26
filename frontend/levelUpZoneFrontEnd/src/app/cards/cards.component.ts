import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Juego } from '../juegos';
import { JuegosService } from '../juegos.service';
import { InventarioService } from '../inventario.service';



@Component({
  selector: 'app-cards',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardsComponent implements OnInit{
  juegos: Juego[] = [];
  isDialogVisible: boolean = false;
  selectedJuego: Juego | null = null;
  constructor(private juegosService: JuegosService, private inventarioService: InventarioService) {}

  ngOnInit(): void {
    this.juegosService.getJuegos().subscribe(juegos => {
      this.juegos = juegos;
    });
  }

  openDialog(juego: Juego): void {
    this.selectedJuego = juego;
    this.isDialogVisible = true;
  }

  closeDialog(): void {
    this.isDialogVisible = false;
    this.selectedJuego = null;
  }
}
