import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Game } from '../games';
import { GamesService } from '../games.service';
import { CollectionsService } from '../collections.service';



@Component({
  selector: 'app-cards',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardsComponent implements OnInit{
  Games: Game[] = [];
  isDialogVisible: boolean = false;
  selectedGame: Game | null = null;
  constructor(private readonly gamesService: GamesService, private readonly CollectionsService: CollectionsService) {}

  ngOnInit(): void {
    this.gamesService.getGames().subscribe(Games => {
      this.Games = Games;
    });
  }

  openDialog(game: Game): void {
    this.selectedGame = game;
    this.isDialogVisible = true;
  }

  closeDialog(): void {
    this.isDialogVisible = false;
    this.selectedGame = null;
  }
}
