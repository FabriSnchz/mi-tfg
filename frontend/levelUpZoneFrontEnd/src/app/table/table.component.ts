import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { BehaviorSubject } from 'rxjs';
import { ColeccionesService } from '../colecciones.service';
import { Coleccion } from '../colecciones';

@Component({
  selector: 'app-table',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit, AfterViewInit {

  // TODO: Hacer tabla para juegos
  // TODO: Hacer tabla para admin después. Osea que sea dínamica, dependiendo de que usuario vienen los datos.
  // TODO: Incluir Sorting, filtro y paginación

  inventario: Coleccion[] = [];
  displayedColumns: string[] = ['nombre', 'genero', 'fecha_lanzamiento', 'plataformas', 'multijugador', 'foto'];
  dataSubject = new BehaviorSubject<any[]>([]);
  // idCatalogoGuardado: number = 0;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private readonly coleccioneService: ColeccionesService) {}

  ngOnInit(): void {
    console.log('ngOnInit ejecutado');
    this.coleccioneService.getColecciones().subscribe(colecciones => {
      console.log('Colecciones obtenidas:', colecciones);
      this.dataSubject.next(colecciones); // Actualiza el BehaviorSubject
    });

    this.dataSubject.subscribe(datos => {
      console.log('Datos recibidos en el dataSubject:', datos);  // Ver los datos al cambiar
      this.dataSource.data = datos; // Refleja cambios en la tabla
    });
}

  ngAfterViewInit() {
    console.log('ngAfterViewInit ejecutado');
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log('Filtro aplicado:', filterValue);  // Ver el valor del filtro
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
