import { AfterViewInit, ChangeDetectionStrategy, Component, Inject, inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { Game } from '../games';
import { GamesService } from '../games.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../auth-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';




@Component({
    selector: 'app-games',
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, RouterLink, MatPaginatorModule],
    changeDetection: ChangeDetectionStrategy.OnPush, // Se utiliza para mejorar el rendimiento de la aplicación al evitar la detección de cambios innecesarios.
    templateUrl: './games.component.html',
    styleUrl: './games.component.scss'
})
export class GamesComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageSize = 10;
  pageIndex = 0;
  pagedGames: Game[] = [];    // los juegos visibles en la página

  route = inject(ActivatedRoute);
  gameId!: string;
  Games: Game[] = [];
  FilteredGames: Game[] = [];
  isLogged: boolean = false;
  role: string = '';

  constructor(private readonly gamesService: GamesService, @Inject(PLATFORM_ID) private readonly platformId: Object, private readonly authService: AuthService, private readonly snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.gamesService.emitirGames(); // Dispara la carga inicial de Games

    this.gamesService.Games$.subscribe(Games => {
      this.Games = Games;
      this.FilteredGames = Games;
      this.updatePagedGames();
      // this.gamesService.emitirGames(); // Dispara la carga inicial de Games
    });

    this.route.paramMap.subscribe(params => {
      this.gameId = params.get('id')!;
    });

    if (isPlatformBrowser(this.platformId)) {
      this.role = this.authService.getUserRole() ?? '';
      this.isLogged = this.authService.getToken() !== null;
    }
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe(() => {
      this.pageIndex = this.paginator.pageIndex;
      this.pageSize = this.paginator.pageSize;
      this.updatePagedGames();
    });
  }
  updatePagedGames() {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.pagedGames = this.FilteredGames.slice(start, end);
  }

  // filtrarResultado(texto: string) {
  //   if (!texto) {
  //     this.FilteredGames = this.Games;
  //     return;
  //   }
  //   this.FilteredGames = this.Games.filter( FilteredGames =>
  //     FilteredGames?.name.toLowerCase().includes(texto.toLowerCase())
  //   );
  // }
  filtrarResultado(texto: string) {
    if (!texto) {
      this.FilteredGames = this.Games;
    } else {
      this.FilteredGames = this.Games.filter(game =>
        game?.name.toLowerCase().includes(texto.toLowerCase())
      );
    }
    this.paginator.firstPage();
    this.updatePagedGames();
  }

  trackByIndex(index: number, _: any): number {
    return index;
  }


  // * Método que verifica si tienes una cuenta para agregar juegos a favoritos o a una colección y si no la tienes, muestra un mensaje de error.
  showAuthMsg(origin: number) {
    let texto = '';
    if (origin === 1) {
      texto = 'Debes tener una cuenta para agregar juegos a favoritos.';
    } else if (origin === 2) {
      texto = 'Debes tener una cuenta para agregar juegos.';
    }
    this.snackBar.open(texto, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
