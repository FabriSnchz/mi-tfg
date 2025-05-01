import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Collection } from './collections';

@Injectable({
  providedIn: 'root'
})
export class CollectionsService {
  private readonly apiUrl = 'http://localhost:8080/colecciones';  // URL de la API
  constructor(private readonly http: HttpClient) { }
  getCollections(): Observable<Collection[]> {
    return this.http.get<Collection[]>(this.apiUrl);
  }
}
