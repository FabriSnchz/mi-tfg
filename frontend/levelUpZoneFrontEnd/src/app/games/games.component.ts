import { ChangeDetectionStrategy, Component, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';
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



@Component({
    selector: 'app-games',
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, RouterLink],
    changeDetection: ChangeDetectionStrategy.OnPush, // Se utiliza para mejorar el rendimiento de la aplicación al evitar la detección de cambios innecesarios.
    templateUrl: './games.component.html',
    styleUrl: './games.component.scss'
})
export class GamesComponent implements OnInit {
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
    });

    this.route.paramMap.subscribe(params => {
      this.gameId = params.get('id')!;
    });

    if (isPlatformBrowser(this.platformId)) {
      this.role = this.authService.getUserRole() ?? '';
      this.isLogged = this.authService.getToken() !== null;
    }
  }


  filtrarResultado(texto: string) {
    if (!texto) {
      this.FilteredGames = this.Games;
      return;
    }
    this.FilteredGames = this.Games.filter( FilteredGames =>
      FilteredGames?.name.toLowerCase().includes(texto.toLowerCase())
    );
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
