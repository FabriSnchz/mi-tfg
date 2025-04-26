import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Juego } from "./juegos";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class JuegosService {
  private readonly apiUrl = 'http://localhost:8080/juegos';  // URL de la API
  private readonly juegosSubject = new BehaviorSubject<Juego[]>([]);
  juegos$ = this.juegosSubject.asObservable(); // Observable para suscribirse a los cambios en la lista de juegos

  constructor(private readonly http: HttpClient) { }
  getJuegos(): Observable<Juego[]> {
    return this.http.get<Juego[]>(this.apiUrl);
  }

  emitirJuegos(): void {
    this.getJuegos().subscribe(juegos => {
      this.juegosSubject.next(juegos); // Emitir la lista de juegos a través del BehaviorSubject
    });
  }
}
