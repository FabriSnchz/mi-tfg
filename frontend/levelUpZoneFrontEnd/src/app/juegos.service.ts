import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Juego } from "./juegos";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class JuegosService {
  private apiUrl = 'http://localhost:8080/juegos';  // URL de la API
  constructor(private http: HttpClient) { }
  getJuegos(): Observable<Juego[]> {
    return this.http.get<Juego[]>(this.apiUrl);
  }
}
