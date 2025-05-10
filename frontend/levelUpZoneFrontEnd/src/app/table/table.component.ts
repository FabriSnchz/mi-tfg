import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { BehaviorSubject } from 'rxjs';
import { Collection } from '../collections';
import { CollectionsService } from '../collections.service';
import { GamesService } from '../games.service';
import { Game } from '../games';

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

  displayedColumns: string[] = ['name', 'genre', 'release_date', 'studio', 'multiplayer', 'platforms'];
  dataSubject = new BehaviorSubject<any[]>([]);
  // idCatalogoGuardado: number = 0;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  @ViewChild(MatSort) sort!: MatSort;
  infoGames: { userId: string, gameId: number }[] = [];
  gameId: any;
  userId: any;
  gameIds: any;


  constructor(private readonly collectionsService: CollectionsService, private readonly gamesService: GamesService) {
    if (typeof window !== 'undefined') {
    const storedGames = localStorage.getItem('games');
          console.log('games: ', storedGames);

    if (storedGames) {
      this.gameIds = JSON.parse(storedGames);
    // this.infoGames = JSON.parse(storedGames) as { userId: string; gameId: number }[];
    // const userId = localStorage.getItem('userId');
    // this.gameIds = this.infoGames.filter(g => g.userId === userId).map(g => g.gameId);
    console.log('gamesIDS QUE NO ES ITERABLE:', this.gameIds);

    const gamesArray: Game[] = [];
    for (const gameId of this.gameIds) {
        this.gamesService.getGameById(gameId).subscribe(game => {
          gamesArray.push(game);

          if (gamesArray.length === this.gameIds.length) {
            this.dataSubject.next(gamesArray);
          }
        });
      }
    }
  }
}
  ngOnInit(): void {
        this.dataSubject.subscribe(receivedData => {
      console.log('Datos recibidos en el dataSubject:', receivedData);  // Ver los datos al cambiar
      this.dataSource.data = receivedData; // Refleja cambios en la tabla
    });
}

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log('Filtro aplicado:', filterValue);  // Ver el valor del filtro
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  formatPlatforms(platforms: any[]): string {
    return platforms.map(p => p.name).join(', ');
  }
}
