import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Coleccion } from "./colecciones";

@Injectable({
  providedIn: 'root'
})
export class ColeccionesService {
  private apiUrl = 'http://localhost:8080/colecciones';  // URL de la API
  constructor(private http: HttpClient) { }
  getColecciones(): Observable<Coleccion[]> {
    return this.http.get<Coleccion[]>(this.apiUrl);
  }
}
