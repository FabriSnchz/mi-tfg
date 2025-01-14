import { Component, OnInit } from '@angular/core';
import { Juego } from '../juegos';
import { InventarioService } from '../inventario.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-mi-inventario',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './mi-inventario.component.html',
    styleUrl: './mi-inventario.component.scss'
})
export class MiInventarioComponent implements OnInit {
  inventario: Juego[] = [];
  constructor(private inventarioService: InventarioService) {}

  ngOnInit(): void {
    this.inventarioService.getJuegos().subscribe(juegos =>{
      this.inventario = juegos
  });
  }
}
