import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Game } from "./games";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  private readonly apiUrl = 'http://localhost:8080/games';  // URL de la API
  private readonly GamesSubject = new BehaviorSubject<Game[]>([]);
  Games$ = this.GamesSubject.asObservable(); // Observable para suscribirse a los cambios en la lista de Games

  constructor(private readonly http: HttpClient) { }
  getGames(): Observable<Game[]> {
    console.log(this.http.get<Game[]>(this.apiUrl));
    return this.http.get<Game[]>(this.apiUrl);
  }

  emitirGames(): void {
    this.getGames().subscribe(Games => {
      this.GamesSubject.next(Games); // Emitir la lista de Games a través del BehaviorSubject
    });
  }


}
