import {AfterViewInit, Component, Input, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { BehaviorSubject } from 'rxjs';
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

  displayedColumns: string[] = ['name', 'genre', 'release_date', 'studio', 'multiplayer', 'platforms'];
  dataSubject = new BehaviorSubject<any[]>([]);
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  @ViewChild(MatSort) sort!: MatSort;
  infoGames: { userId: string, gameId: number }[] = [];
  gameId: any;
  userId: any;

  @Input() gameIds: any[] = [];

  constructor(private readonly collectionsService: CollectionsService, private readonly gamesService: GamesService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['gameIds'] && this.gameIds?.length) {
      this.loadGames(this.gameIds);
    }
  }

  ngOnInit(): void {
    this.dataSubject.subscribe(receivedData => {
      this.dataSource.data = receivedData;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  private loadGames(gameIds: number[]) {
    const gamesArray: Game[] = [];
    for (const gameId of gameIds) {
      this.gamesService.getGameById(gameId).subscribe(game => {
        gamesArray.push(game);

        if (gamesArray.length === gameIds.length) {
          this.dataSubject.next(gamesArray);
        }
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  formatPlatforms(platforms: any[]): string {
    return platforms.map(p => p.name).join(', ');
  }
}
