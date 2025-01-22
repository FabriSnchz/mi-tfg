import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Juego } from './juegos';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  private apiUrl = 'http://localhost:8080/juegos';
  constructor(private http: HttpClient) { }
  getJuegos(): Observable<Juego[]> {
    return this.http.get<Juego[]>(this.apiUrl);
  }
}
