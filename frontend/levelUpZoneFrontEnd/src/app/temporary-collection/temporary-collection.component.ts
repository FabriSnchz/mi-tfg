import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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

@Component({
  selector: 'app-temporary-collection',
  imports: [MatIcon, MatTable, MatTableModule],
  templateUrl: './temporary-collection.component.html',
  styleUrl: './temporary-collection.component.scss'
})
export class TemporaryCollectionComponent {
  readonly dialog = inject(MatDialog);
  displayedColumns: string[] = ['name', 'genre', 'release_date', 'studio', 'multiplayer', 'platforms', 'action'];
  temporaryGames: Game[] = [];

  constructor(
    private readonly collectionsService: CollectionsService,
    private readonly router: Router,
    private readonly authService: AuthService,
  ) {
    if (typeof window !== 'undefined') {
      const storedGames = localStorage.getItem('temporaryGames');
      if (storedGames) {
        this.temporaryGames = JSON.parse(storedGames);
      }
    }

  }

  removeGame(game: Game): void {
    this.temporaryGames = this.temporaryGames.filter(g => g.id !== game.id);
    localStorage.setItem('temporaryGames', JSON.stringify(this.temporaryGames));
  }

  saveTemporaryCollection(): void {
    if (this.temporaryGames.length === 0) return;

    const collectionName = prompt('Enter a name for your collection:');
    if (!collectionName) return;

    const userId = this.authService.getUserId();
    console.log('User ID:', userId);

    if (userId === null) {
      console.error('User ID is null. Cannot create collection.');
      return;
    }


    const newCollection = {
      name: collectionName,
      user_id: Number(userId),
      // Games: this.temporaryGames
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

      const userId = this.authService.getUserId();
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
