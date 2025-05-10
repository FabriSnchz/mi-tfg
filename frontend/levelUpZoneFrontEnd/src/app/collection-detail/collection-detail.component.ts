import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIcon } from '@angular/material/icon';
import { TableComponent } from '../table/table.component';
import { Collection } from '../collections';
import { CollectionsService } from '../collections.service';
import { AuthService } from '../auth-service';
import { GamesService } from '../games.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-collection-detail',
  imports: [CommonModule, TableComponent, MatIcon],
  templateUrl: './collection-detail.component.html',
  styleUrl: './collection-detail.component.scss'
})
export class CollectionDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  collection: Collection[] = [];
  isLogged: boolean = false;
  role: string = '';
  userName: string = '';
  gameId: any;
  userId: any;
  gameIds: any;
  infoGames: { userId: string, gameId: number }[] = [];

constructor(private readonly collectionService: CollectionsService,  @Inject(PLATFORM_ID) private readonly platformId: Object, private readonly authService: AuthService, private readonly gamesService: GamesService) {}

ngOnInit(): void {
  if (isPlatformBrowser(this.platformId)) {
    // Verificar si el usuario está logueado y obtener su rol
    this.isLogged = this.authService.isLoggedIn();
    this.role = this.authService.getUserRole() ?? '';
    this.userName = this.authService.getUserName() ?? '';


    // Si está logueado, cargar las colecciones del usuario
    if (this.isLogged) {
      const userId = localStorage.getItem('userId');
      if (userId) {
        this.collectionService.getCollectionsByUserId(Number(userId)).subscribe(collections => {
          this.collection = collections;
        });
      }
    } else {
      // Si no está logueado, cargar todas las colecciones
      this.collectionService.getCollections().subscribe(collections => {
        this.collection = collections;
      });
    }
  }
      this.route.paramMap.subscribe(params => {
      this.gameId = params.get('id')!;
      console.log('ID obtenido de la ruta (paramMap):', this.gameId);
    });
}
}
