import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Game } from '../games';
import { GamesService } from '../games.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute, RouterLink } from '@angular/router';


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
  constructor(private readonly gamesService: GamesService) {}

  ngOnInit(): void {
    this.gamesService.emitirGames(); // Dispara la carga inicial de Games

    this.gamesService.Games$.subscribe(Games => {
      this.Games = Games;
      this.FilteredGames = Games;
    });

    this.route.paramMap.subscribe(params => {
      this.gameId = params.get('id')!;
      console.log('ID desde ruta:', this.gameId);

      // Aquí puedes llamar a un método para buscar un juego concreto
      // this.loadGameById(this.gameId);
    });
  }


  filtrarResultado(texto: string) {
    if (!texto) {
      this.FilteredGames = this.Games;
      return;
    }
    this.FilteredGames = this.Games.filter(
      FilteredGames =>
  FilteredGames?.name.toLowerCase().includes(texto.toLowerCase())
    );
  }
}
