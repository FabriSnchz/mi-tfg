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
    console.log('ngOnInit iniciado');

    // // this.gameId = this.route.snapshot.paramMap.get('id')!;
    // this.route.paramMap.subscribe(params => {
    //   this.gameId = params.get('id')!;
    //   console.log('ID obtenido de la ruta (paramMap):', this.gameId);
    //   this.fetchGame();
    // });
        this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.gameId = Number(idParam); // conversión explícita
        console.log('ID obtenido de la ruta (paramMap):', this.gameId);
        this.fetchGame();
      } else {
        this.error = 'No game ID provided in route.';
        this.loading = false;
      }
    });
  }

  fetchGame() {
    console.log('Llamando a fetchGame con ID:', this.gameId);

    this.gameService.getGameById(this.gameId).subscribe({
      next: (data) => {
        console.log('Juego recibido:', data);
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
