import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Game } from './games';
import { Collection } from './collections';

@Injectable({
  providedIn: 'root'
})
export class CollectionsService {
  private readonly apiUrl = 'http://localhost:8080/collections';  // URL de la API
  private readonly storageKey = 'temporaryGames';
  private temporaryGames: Game[] = [];

  private readonly badgeCountSubject = new BehaviorSubject<number>(0);
  badgeCount$ = this.badgeCountSubject.asObservable();

  constructor(private readonly http: HttpClient) {
    if (typeof window !== 'undefined' && window.localStorage) {
      const stored = localStorage.getItem(this.storageKey);
      this.temporaryGames = stored ? JSON.parse(stored) : [];
      this.badgeCountSubject.next(this.temporaryGames.length);
    } else {
      this.temporaryGames = [];
    }
  }

  getTemporaryGames(): Game[] {
    return this.temporaryGames;
  }

  addGame(game: Game): void {
    if (!this.temporaryGames.find(g => g.id === game.id)) {
      this.temporaryGames.push(game);
      this.updateStorage();
    }
  }
  removeGame(gameId: number): void {
    this.temporaryGames = this.temporaryGames.filter(g => g.id !== gameId);
    this.updateStorage();
  }

  clear(): void {
    this.temporaryGames = [];
    this.updateStorage();
  }

  // Método para guardar la colección en el backend
  saveCollection(collection: Collection): Observable<Collection> {
    let headers = new HttpHeaders();
    if (typeof window !== 'undefined') { // Nos aseguramos de que está en el navegador
      const token = localStorage.getItem('token');
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
    }

    return this.http.post<Collection>(this.apiUrl, collection, { headers });
  }

  addGameToCollection(collectionId: number, gameId: number): Observable<any> {
  return this.http.post(`${this.apiUrl}/${collectionId}/games/${gameId}`, {});
}



  private updateStorage(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.storageKey, JSON.stringify(this.temporaryGames));
    }
    this.badgeCountSubject.next(this.temporaryGames.length);
  }

  getCollectionById(id: number): Observable<Collection> {
    const url = `${this.apiUrl}/${id}`;  // Asumiendo que tu backend tiene este endpoint
    return this.http.get<Collection>(url);
  }

  // Método para obtener las colecciones filtradas por el usuario
  getCollectionsByUserId(userId: number): Observable<Collection[]> {
    const url = `${this.apiUrl}/user/${userId}`;  // Asumiendo que tu backend tiene este endpoint
    return this.http.get<Collection[]>(url);
  }
}
