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

constructor(private readonly collectionService: CollectionsService,  @Inject(PLATFORM_ID) private readonly platformId: Object, private readonly authService: AuthService) {}

  ngOnInit(): void {
    this.collectionService.getCollections().subscribe(collections =>{
      this.collection = collections
  });
    if (isPlatformBrowser(this.platformId)) {
      this.role = this.authService.getUserRole() ?? '';
      this.isLogged = this.authService.getToken() !== null;
    }
  }
}
