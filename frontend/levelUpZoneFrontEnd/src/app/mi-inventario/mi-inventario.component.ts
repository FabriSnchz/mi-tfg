import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Coleccion } from '../colecciones';
import { ColeccionesService } from '../colecciones.service';
import { TableComponent } from "../table/table.component";

@Component({
    selector: 'app-mi-inventario',
    standalone: true,
    imports: [CommonModule, TableComponent],
    templateUrl: './mi-inventario.component.html',
    styleUrl: './mi-inventario.component.scss'
})
export class MiInventarioComponent implements OnInit {

  inventario: Coleccion[] = [];

constructor(private coleccioneService: ColeccionesService) {}

  ngOnInit(): void {
    this.coleccioneService.getColecciones().subscribe(colecciones =>{
      this.inventario = colecciones
  });
  }


}
