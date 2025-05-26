import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GamesService } from '../games.service';
import { Game } from '../games';

@Component({
  selector: 'app-game-detail',
  imports: [],
  templateUrl: './game-detail.component.html',
  styleUrl: './game-detail.component.scss'
})
export class GameDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly gameService = inject(GamesService);

  gameId!: number;
  game!: Game;
  loading = true;
  error = '';

  ngOnInit() {
        this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.gameId = Number(idParam);
        this.fetchGame();
      } else {
        this.error = 'No se proporcionó ID del juego en la ruta.';
        this.loading = false;
      }
    });
  }

  fetchGame() {
    this.gameService.getGameById(this.gameId).subscribe({
      next: (data) => {
        this.game = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar el juego:', err);
        this.error = 'Error loading game';
        this.loading = false;
      }
    });
  }
}
