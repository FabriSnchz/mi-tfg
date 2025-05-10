import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Collection } from '../collections';
import { CollectionsService } from '../collections.service';
import { TableComponent } from "../table/table.component";
import { AuthService } from '../auth-service';
import { MatIcon } from '@angular/material/icon';
import { GamesService } from '../games.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-collection',
    standalone: true,
    imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule, MatGridListModule],
    templateUrl: './collection.component.html',
    styleUrl: './collection.component.scss'
})
export class CollectionComponent implements OnInit {
  collections: Collection[] = [];
  userId: any;
  isLogged: boolean = false;
  role: string = '';
  userName: string = '';
  constructor (private readonly collectionsService: CollectionsService, @Inject(PLATFORM_ID) private readonly platformId: Object, private readonly authService: AuthService) {
    if (typeof window !== 'undefined') {
      this.userId = localStorage.getItem('userId');
    }
  }

  ngOnInit(): void {

    if (isPlatformBrowser(this.platformId)) {
    // Verificar si el usuario está logueado y obtener su rol
    this.isLogged = this.authService.isLoggedIn();
    this.role = this.authService.getUserRole() ?? '';
    this.userName = this.authService.getUserName() ?? '';

    }

    this.collectionsService.getCollectionsByUserId(this.userId).subscribe( games => {
      this.collections = games;
    });
  }
}
