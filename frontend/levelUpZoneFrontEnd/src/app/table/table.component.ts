import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { BehaviorSubject } from 'rxjs';
import { Collection } from '../collections';
import { CollectionsService } from '../collections.service';

@Component({
  selector: 'app-table',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit, AfterViewInit {

  // TODO: Hacer tabla para Games
  // TODO: Hacer tabla para admin después. Osea que sea dínamica, dependiendo de que usuario vienen los datos.
  // TODO: Incluir Sorting, filtro y paginación

  displayedColumns: string[] = ['name', 'genre', 'release_date', 'platforms', 'multiplayer', 'photo'];
  dataSubject = new BehaviorSubject<any[]>([]);
  // idCatalogoGuardado: number = 0;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private readonly collectionsService: CollectionsService) {}

  ngOnInit(): void {
    console.log('ngOnInit ejecutado');
    this.collectionsService.getCollections().subscribe(collections => {
      console.log('Colecciones obtenidas:', collections);
      this.dataSubject.next(collections); // Actualiza el BehaviorSubject
    });

    this.dataSubject.subscribe(receivedData => {
      console.log('Datos recibidos en el dataSubject:', receivedData);  // Ver los datos al cambiar
      this.dataSource.data = receivedData; // Refleja cambios en la tabla
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
