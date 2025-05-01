import { ChangeDetectionStrategy, Component, inject, OnInit, Inject } from '@angular/core';
import { Game } from '../games';
import { GamesService } from '../games.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent,  MatDialogRef,  MatDialogTitle, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';


@Component({
    selector: 'app-games',
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
    changeDetection: ChangeDetectionStrategy.OnPush, // Se utiliza para mejorar el rendimiento de la aplicación al evitar la detección de cambios innecesarios.
    templateUrl: './games.component.html',
    styleUrl: './games.component.scss'
})
export class GamesComponent implements OnInit {
  Games: Game[] = [];
  FilteredGames: Game[] = [];
  readonly dialog = inject(MatDialog);
  constructor(private readonly GamesService: GamesService) {}

  ngOnInit(): void {
    this.GamesService.emitirGames(); // Dispara la carga inicial de Games
    this.GamesService.Games$.subscribe(Games => {
      this.Games = Games;
      this.FilteredGames = Games; // Inicializa los Games filtrados con todos los Games
    });
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, game: Game): void {
    this.dialog.open(Dialog, {
      width: '90%',
      height: '75%',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { selectedGame: game } // Pasa el game seleccionado al diálogo
    });
  }

  filtrarResultado(texto: string) {
    if (!texto) {
      this.FilteredGames = this.Games;
      return;
    }
    this.FilteredGames = this.Games.filter(
      FilteredGames =>
  FilteredGames?.nombre.toLowerCase().includes(texto.toLowerCase())
    );
  }
}

@Component({
  selector: 'dialog',
  templateUrl: 'dialog.html',
  styleUrl: 'Games.component.scss',
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dialog {
  selectedGame: Game | null = null;
  constructor(@Inject(MAT_DIALOG_DATA) public data: { selectedGame: Game },
    private readonly GamesService: GamesService) {
      this.selectedGame = data.selectedGame;
      }
  readonly dialogRef = inject(MatDialogRef<Dialog>);
}
