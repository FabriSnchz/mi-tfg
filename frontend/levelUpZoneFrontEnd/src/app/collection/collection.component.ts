import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Collection } from '../collections';
import { CollectionsService } from '../collections.service';
import { TableComponent } from "../table/table.component";

@Component({
    selector: 'app-collection',
    standalone: true,
    imports: [CommonModule, TableComponent],
    templateUrl: './collection.component.html',
    styleUrl: './collection.component.scss'
})
export class CollectionComponent implements OnInit {

  collection: Collection[] = [];

constructor(private readonly collectionService: CollectionsService) {}

  ngOnInit(): void {
    this.collectionService.getCollections().subscribe(collections =>{
      this.collection = collections
  });
  }


}
