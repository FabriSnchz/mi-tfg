import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Collection } from '../collections';
import { CollectionsService } from '../collections.service';
import { TableComponent } from "../table/table.component";
import { AuthService } from '../auth-service';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-collection',
    standalone: true,
    imports: [CommonModule, TableComponent, MatIcon],
    templateUrl: './collection.component.html',
    styleUrl: './collection.component.scss'
})
export class CollectionComponent implements OnInit {
  collection: Collection[] = [];
  isLogged: boolean = false;
  role: string = '';
  userName: string = '';


constructor(private readonly collectionService: CollectionsService,  @Inject(PLATFORM_ID) private readonly platformId: Object, private readonly authService: AuthService) {}

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
}
}
