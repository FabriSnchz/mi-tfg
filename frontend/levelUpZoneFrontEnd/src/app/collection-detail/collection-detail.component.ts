import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { TableComponent } from '../table/table.component';
import { Collection } from '../collections';
import { CollectionsService } from '../collections.service';
import { AuthService } from '../auth-service';
import { GamesService } from '../games.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-collection-detail',
  imports: [CommonModule, TableComponent],
  templateUrl: './collection-detail.component.html',
  styleUrl: './collection-detail.component.scss'
})
export class CollectionDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  collections: Collection[] = [];
  isLogged: boolean = false;
  role: string = '';
  userName: string = '';
  gameId: any;
  userId: any;
  gameIds: number[] = [];
  infoGames: { userId: string, gameId: number }[] = [];

  collectionId: any;

constructor(private readonly collectionsService: CollectionsService,  @Inject(PLATFORM_ID) private readonly platformId: Object, private readonly authService: AuthService, private readonly gamesService: GamesService) {}

ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.collectionId = params.get('id')!;
    });

  if (isPlatformBrowser(this.platformId)) {
    // Verificar si el usuario está logueado y obtener su rol
    this.isLogged = this.authService.isLoggedIn();
    this.role = this.authService.getUserRole() ?? '';
    this.userName = this.authService.getUserName() ?? '';


    // Si está logueado, cargar las colecciones del usuario
    if (this.isLogged) {
      const userId = localStorage.getItem('userId');
      if (userId) {
        this.collectionsService.getCollectionsByUserId(Number(userId)).subscribe(collections => {
          this.collections = collections;
        });
        this.collectionsService.getCollectionById(this.collectionId).subscribe(collection => {
          this.gameIds = collection.games?.map(game => game.id) ?? [];
      });
      }
    }
  }

}
}
