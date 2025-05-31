import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Game } from '../games';
import { CollectionsService } from '../collections.service';
import { Router, RouterLink } from '@angular/router';
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
import { Collection } from '../collections';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-temporary-collection',
  imports: [MatIcon, MatTable, MatTableModule, RouterLink, MatCardModule],
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

  // TODO: Alinear el constructor para que sea más legible cuando termine
  constructor(
    private readonly collectionsService: CollectionsService,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly gamesService: GamesService,
  ) {
    if (typeof window !== 'undefined') {
      const storedGames = localStorage.getItem('temporaryGames');
      if (storedGames) {
        this.infoGames = JSON.parse(storedGames) as { userId: string; gameId: number }[];
        this.gameId = localStorage.getItem('gameId');
        this.userId = localStorage.getItem('userId');
        this.gameIds = this.infoGames.filter(g => g.userId === this.userId).map(g => g.gameId);

        for (const gameId of this.gameIds) {
          this.gamesService.getGameById(gameId).subscribe(game => {
            this.temporaryGames.push(game);
            this.temporaryGames = [...this.temporaryGames]; // force refresh
          });
        }
      }

    }
  }

  ngOnInit() {
    this.isLogged = this.authService.isLoggedIn();
    this.role = this.authService.getUserRole() ?? '';
  }


  removeGame(game: Game): void {
    this.infoGames = this.infoGames.filter(g => g.gameId !== game.id);
    localStorage.setItem('temporaryGames', JSON.stringify(this.infoGames));
    this.temporaryGames = this.temporaryGames.filter(g => g.id !== game.id);
  }

  removeAllGames(): void {
    this.infoGames = [];
    localStorage.removeItem('temporaryGames');
    this.temporaryGames = [];
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

  const newCollection: Collection = {
    name: collectionName,
    user_id: Number(this.userId)
  };

    this.collectionsService.saveCollection(newCollection).subscribe({
      next: (savedCollection) => {
        alert('Collection saved successfully!');
        // TODO: Hacer un pop up de éxito

        const collectionId = savedCollection.id;

        if (collectionId === undefined) {
          console.error('Error: collection_id no está definido');
          return;
        }

        this.temporaryGames.forEach(game => {
          this.collectionsService.addGameToCollection(collectionId, game.id).subscribe({
            error: (err) => console.error(`Error al asociar el juego ${game.id}:`, err)
          });
        });

        localStorage.removeItem('temporaryGames');
        localStorage.setItem('games', JSON.stringify(this.temporaryGames.map(g => g.id)));
        this.temporaryGames = [];
        this.router.navigate(['/collections']);
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error al guardar la colección:', err);
        alert('Hubo un error al guardar la colección.');
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

      if (userId === null) {
          console.error('El ID de usuario es nulo. No se puede crear la colección.');
        return;
      }

      const newCollection = {
        name: collectionName,
        user_id: Number(userId),
      };

  this.collectionsService.saveCollection(newCollection).subscribe({
    next: (createdCollection) => {
      const collectionId: any = createdCollection.id;
      const selectedGameIds = this.temporaryGames.map(game => game.id); // solo IDs
      let selectedGameId;
      for(selectedGameId of selectedGameIds) {
            this.collectionsService.addGameToCollection(collectionId, selectedGameId).subscribe({
        next: () => {
          console.log('Juego asociado exitosamente a la colección');
        },
        error: (error) => {
          console.error('Error al asociar el juego a la colección', error);
        }
      });
      }
    },
    error: (error) => {
      console.error('Error al crear la colección', error);
        }
      });
    });
  }

  abrirLogin() {
    this.collectionsService.openAuthDialog(false);
    // setTimeout(() => this.collectionsService.toggleRegisterMode(false), 100); // Espera corta para que el componente se inicialice
  }
  abrirRegistro() {
    this.collectionsService.openAuthDialog(true);
    // setTimeout(() => this.collectionsService.toggleRegisterMode(true), 100);
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
