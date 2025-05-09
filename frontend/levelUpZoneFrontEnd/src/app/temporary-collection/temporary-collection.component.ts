import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Game } from '../games';
import { CollectionsService } from '../collections.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTable, MatTableModule } from '@angular/material/table';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth-service';
import { GamesService } from '../games.service';

@Component({
  selector: 'app-temporary-collection',
  imports: [MatIcon, MatTable, MatTableModule],
  templateUrl: './temporary-collection.component.html',
  styleUrl: './temporary-collection.component.scss'
})
export class TemporaryCollectionComponent implements OnInit {
  isLogged: boolean = false;
  role: string = '';
  readonly dialog = inject(MatDialog);
  displayedColumns: string[] = ['name', 'genre', 'release_date', 'studio', 'multiplayer', 'platforms', 'action'];
  temporaryGames: Game[] = [];
  gameId: any;
  userId: any;
  gameIds: any;
  infoGames: { userId: string, gameId: number }[] = [];


  constructor(
    private readonly collectionsService: CollectionsService,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly gamesService: GamesService,
  ) {
    if (typeof window !== 'undefined') {
      const storedGames = localStorage.getItem('temporaryGames');
      console.log('storedGames: ', storedGames);
      if (storedGames) {
        this.infoGames = JSON.parse(storedGames) as { userId: string; gameId: number }[];
        console.log('infoGames: ', this.infoGames);
        this.gameId = localStorage.getItem('gameId');
        this.userId = localStorage.getItem('userId');
        console.log('gameId: ', this.gameId);
        this.gameIds = this.infoGames.filter(g => g.userId === this.userId).map(g => g.gameId);
        console.log('gameIds: ', this.gameIds);
        // const matchingGames = this.infoGames.filter(g => this.gameIds.includes(g.gameId));

        for (const gameId of this.gameIds) {
          console.log('gamesIdConst: ', gameId);
          this.gamesService.getGameById(gameId).subscribe(game => {
            this.temporaryGames.push(game);
            this.temporaryGames = [...this.temporaryGames]; // force refresh
            console.log('temporaryGames: ', this.temporaryGames);
          });
        }
      }

      // this.collectionsService.getCollectionsByUserId(Number(storedGames));
      // cont storedGamesByUserId = storedGames.filter(g => g.id = storedGames);
    }
  }

  ngOnInit() {
    this.isLogged = this.authService.isLoggedIn();
    this.role = this.authService.getUserRole() ?? '';


    // console.log('infoGames: ', this.infoGames);
    console.log('userId: ', this.userId);
    console.log('gamesIds: ', this.gameIds);
    console.log('gamesId: ', this.gameId);
  }


  removeGame(game: Game): void {
    // Elimina la referencia al juego por su id
    this.infoGames = this.infoGames.filter(g => g.gameId !== game.id);

    // Actualiza el localStorage con el array de referencias actualizado
    localStorage.setItem('temporaryGames', JSON.stringify(this.infoGames));

    // También elimina el juego del array mostrado en pantalla
    this.temporaryGames = this.temporaryGames.filter(g => g.id !== game.id);
  }

  saveTemporaryCollection(): void {
    if (this.temporaryGames.length === 0) return;

    const collectionName = prompt('Enter a name for your collection:');
    if (!collectionName) return;

    const userId = localStorage.getItem('userId'); // Get userId from localStorage

    if (userId === null) {
      console.error('User ID is null. Cannot create collection.');
      return;
    }


    const newCollection = {
      name: collectionName,
      user_id: Number(this.userId),
      // Games: this.temporaryGames
      gameIds: this.temporaryGames.map(game => game.id) // solo IDs
    };

    this.collectionsService.saveCollection(newCollection).subscribe({
      next: () => {
        // console.log('User ID:', Number(this.userId));
        alert('Collection saved successfully!');
        localStorage.removeItem('temporaryGames');
        this.temporaryGames = [];
        this.router.navigate(['/collections']);
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error saving collection:', err);
        alert('There was an error saving the collection.');
      }
    });
  }

  formatPlatforms(platforms: any[]): string {
    return platforms.map(p => p.name).join(', ');
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(Dialog, {
      width: '90%',
      enterAnimationDuration,
      exitAnimationDuration,
      backdropClass: 'blur-backdrop'
    });

    dialogRef.afterClosed().subscribe((collectionName: string) => {
      if (!collectionName) return;

      const userId =  localStorage.getItem('userId');
      console.log('User ID:', userId);

      if (userId === null) {
        console.error('User ID is null. Cannot create collection.');
        return;
      }


      const newCollection = {
        name: collectionName,
        user_id: Number(userId), // Ajusta esto con el usuario logueado
        gameIds: this.temporaryGames.map(game => game.id) // solo IDs
      };

      this.collectionsService.saveCollection(newCollection).subscribe({
        next: () => {
          alert('Collection saved successfully!');
          localStorage.removeItem('temporaryGames');
          this.temporaryGames = [];
          this.router.navigate(['/collections']);
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error saving collection:', err);
          alert('There was an error saving the collection.');
        }
      });
    });
  }
}

@Component({
  selector: 'dialog',
  templateUrl: 'dialog.html',
  styleUrl: 'temporary-collection.component.scss',
  imports: [FormsModule, MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dialog {
  collectionName: string = '';
  readonly dialogRef = inject(MatDialogRef<Dialog>);

  save(): void {
    this.dialogRef.close(this.collectionName);
  }
}
