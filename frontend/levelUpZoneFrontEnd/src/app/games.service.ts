import { HttpClient, HttpHeaders } from "@angular/common/http";
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
    let headers = new HttpHeaders();

    if (typeof window !== 'undefined') { // Nos aseguramos de que está en el navegador
      const token = localStorage.getItem('token');
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
    }

    return this.http.get<Game[]>(this.apiUrl, { headers });
  }

  getGameById(id: string): Observable<Game> {
    return this.http.get<Game>(`${this.apiUrl}/${id}`);  // Aquí usamos la URL completa
  }


  emitirGames(): void {
    this.getGames().subscribe(Games => {
      this.GamesSubject.next(Games); // Emitir la lista de Games a través del BehaviorSubject
    });
  }


}
